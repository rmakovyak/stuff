import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Welcome, {this.props.name}
        </p>
        <button onClick={() => {
          firebase.auth().signOut().then(function () {
            // Sign-out successful.
          }).catch(function (error) {
            // An error happened.
          });
        }}>sign out</button>
      </div>
    );
  }
}

export default App;
