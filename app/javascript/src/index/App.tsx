import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./App/Home";
import GamesPage from "./App/GamesPage";
import LoginPage from "./App/LoginPage";
import SignupPage from "./App/SignupPage";
import PrivateRoute from "./App/PrivateRoute";
import { AuthContext } from "./shared/auth";
import { ApiContext } from "./shared/api";
import api from "src/api";
import GamePage from "./App/GamePage";
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
            <Navbar.Brand>TicTocToe+</Navbar.Brand>
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
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Switch>
              <PrivateRoute path='/games/:id' component={GamePage}/>
              <PrivateRoute path="/games" component={GamesPage} />
            </Switch>
          </Container>
        </Router>
      </ApiContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
