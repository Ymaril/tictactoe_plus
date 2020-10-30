import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./App/Home";
import Games from "./App/Games";
import Login from "./App/Login";
import Signup from "./App/Signup";
import PrivateRoute from "./App/PrivateRoute";
import { AuthContext } from "./shared/auth";
import { ApiContext } from "./shared/api";
import api from "src/api";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const existingUser = JSON.parse(localStorage.getItem("currentUser"));
  const [currentUser, setCurrentUser] = useState(existingUser);
  if (token) {
    api.defaults.headers.common = { Authorization: token };
  }

  api.defaults.validateStatus = (res) => {
    if (res === 401) {
      sighOut();
    }
    return true;
  };

  const signIn = (token: string, user: object) => {
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setToken(token);
    setCurrentUser(user);
    api.defaults.headers.common = { Authorization: token };
  };

  const sighOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setToken(undefined);
    setCurrentUser(undefined);
    api.defaults.headers.common = {};
  };

  return (
    <AuthContext.Provider value={{ signIn, sighOut, token, currentUser }}>
      <ApiContext.Provider value={api}>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home Page</Link>
              </li>
              {!token && (
                <Fragment>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                </Fragment>
              )}
              {token && (
                <li>
                  <Link to="/games">Games</Link>
                </li>
              )}
            </ul>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/games" component={Games} />
          </div>
        </Router>
      </ApiContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
