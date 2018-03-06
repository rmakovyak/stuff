import React, { Component } from 'react';
import { checkAuth, signOut } from './App.helper';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false
        }
    }

    componentDidMount() {
        window.gapi.load('client', () => {
            checkAuth(true, this.handleAuth.bind(this));
        });
    }

    /**
   * Check user authenification status and set app state accordingly
   */
    handleAuth(authResult) {
        if (authResult && !authResult.error) {
            this.setState({
                authenticated: true
            });
        }
    }

    /**
    * Request Google authentification
    */
    authenticate(e) {
        e.preventDefault();
        checkAuth(false, this.handleAuth.bind(this));
    }

    render() {
        if (this.state.authenticated === false) {
            return (
                <button onClick={this.authenticate.bind(this)} className="btn">Connect with Google</button>
            );
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    Welcome
                </p>
            </div>
        );
    }
}

export default App;
