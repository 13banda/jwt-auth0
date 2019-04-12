// src/Auth/Auth.js

import auth0 from 'auth0-js';
import history from './history';

class Auth {
  accessToken;
  idToken;
  expiresAt;
  userProfile;
  auth0 = new auth0.WebAuth({
    domain: 'auth-local.auth0.com',
    clientID: 'gcj2PCxK1dtSOu990albYkmykYSwq75a',
    redirectUri: 'http://localhost:3001/callback',
    responseType: 'token id_token',
    audience: 'http://localhost:3000/todo',
    scope: 'openid profile email'
  });
  constructor (){
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }
  login() {
    this.auth0.authorize();
  }
  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if(authResult && authResult.accessToken && authResult.idToken){
        this.setSession(authResult);
      } else if (err) {
        history.replace('/')
        console.log(err);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken
  }

  setSession(authResult) {

    // Set is loggedIn flag in localStorage
    localStorage.setItem('isLoggedIn','true');

    // set the time when access token expire
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    // navigate to home route

    history.replace('/home')
  }
  renewSession() {
    this.auth0.checkSession({},(err,authResult) => {
      if(authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)

      } else if (err) {
        console.log('someting problem');
        this.logout();
        console.log(err);
      }
    })
  }

  logout() {
    // Remove access token and expire time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn Flag from localStorage
    if(history.location.pathname !== '/')
     this.auth0.logout({
       return_to: window.location.origin
     })
     // navigate to home route
    // history.replace('/')
  }
  getProfile(cb) {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
 }
  isAuthenticated() {
    // check is access token expire or not

    let expiresAt = this.expiresAt
    return new Date().getTime() < expiresAt;
  }
}

export default Auth
