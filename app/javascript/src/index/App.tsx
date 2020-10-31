import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./App/Home";
import Games from "./App/Games";
import Login from "./App/Login";
import Signup from "./App/Signup";
import PrivateRoute from "./App/PrivateRoute";
import { AuthContext } from "./shared/auth";
import { ApiContext } from "./shared/api";
import api from "src/api";
import Game from "src/index/App/Game";
import {Container, Nav, Navbar} from "react-bootstrap";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const existingUser = JSON.parse(localStorage.getItem("currentUser"));
  const [currentUser, setCurrentUser] = useState(existingUser);
  if (token) {
    api.defaults.headers.common = { Authorization: token };
  }

  api.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) { sighOut(); }
        return error;
      }
  );

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
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">TicTocToe+</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {!token &&
                <Fragment>
                  <Nav.Link as={Link} to='/login'>Войти</Nav.Link>
                  <Nav.Link as={Link} to='/signup'>Регистрация</Nav.Link>
                </Fragment>}
                {token &&
                <Fragment>
                  <Nav.Link as={Link} to='/games'>Игры</Nav.Link>
                </Fragment>}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Container className='mt-5'>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Switch>
              <PrivateRoute path='/games/:id' component={Game}/>
              <PrivateRoute path="/games" component={Games} />
            </Switch>
          </Container>
        </Router>
      </ApiContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
