import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EmployeesList } from './components/MainPage/EmployeesList';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from './Services/Authentication';
import { LogIn } from './components/LandingPage/LogIn';
import { Register } from './components/LandingPage/Register';

export const LOGIN_PATH: string = "/login"
export const REGISTER_PATH: string = "/signup"
export const APP_PATH: string = "/"

const App = () => {
  return (
    <Container className="App d-flex align-items-center justify-content-center">
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route path={LOGIN_PATH} component={LogIn} />
            <Route path={REGISTER_PATH} component={Register} />
            <Route exact path={APP_PATH} component={EmployeesList} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
