import React, { Component } from 'react';
import './App.css';
import UserInfo from './components/UserInfo'

class App extends Component {

  goTo = (route) => {
    this.props.history.replace(`${route}`)
  }

  login = () => {
    this.props.auth.login()
  }

  logout = () => {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true' ){
      renewSession();
    }
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="App">
        <header className="App-header">
         TODO APP
         {
           !isAuthenticated() && (
             <button className="float-right" onClick={this.login}>Log In</button>
           )
         }
         {
           isAuthenticated() && (
             <UserInfo {...this.props} />
           )
         }
        </header>
      </div>
    );
  }
}

export default App;
