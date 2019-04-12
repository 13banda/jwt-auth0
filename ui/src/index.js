import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router,Route } from 'react-router-dom'
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import history from './history'
import Auth from './auth';
import Home from './container/Home';
import Callback from './components/Callback';
export const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const  Routes = (
  <Router history={history} component={App}>
    <div>
      <Route path="/" render={(props) => <App auth={auth} {...props} />} />
      <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
      <Route path="/callback" render={(props) => {
        handleAuthentication(props);
        return <Callback {...props} />
      }}/>
    </div>
  </Router>
)
ReactDOM.render(Routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
