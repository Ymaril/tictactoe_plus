import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./App/Home";
import Admin from "./App/Admin";
import Login from "./App/Login";
import Signup from "./App/Signup";
import PrivateRoute from "./App/PrivateRoute";
import { AuthContext } from "./shared/auth";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const existingUser = JSON.parse(localStorage.getItem("currentUser"));
  const [currentUser, setCurrentUser] = useState(existingUser);

  const signIn = (token: string, user: object) => {
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setToken(token);
    setCurrentUser(user);
  };

  const sighOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setToken(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ signIn, sighOut, token, currentUser }}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
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
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
