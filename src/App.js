import React, { Component } from 'react';
import { checkAuth } from './App.helper';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			authenticated: false
		}
	}

	componentDidMount() {
		window.gapi.load('client', () => {
			checkAuth(true, false, this.handleAuth.bind(this));
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

			window.gapi.client.load('calendar', 'v3', () => {
				window.gapi.client.calendar.events.list({
					'calendarId': 'primary',
					'timeMin': (new Date()).toISOString(),
					'showDeleted': false,
					'singleEvents': true,
					'maxResults': 10,
					'orderBy': 'startTime'
				}).then(function (response) {
					var events = response.result.items;
					console.log(events);
				});
			});
		}
	}

	/**
	* Request Google authentification
	*/
	authenticate(e) {
		e.preventDefault();
		checkAuth(false, true, this.handleAuth.bind(this));
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
					Welcome, {this.props.name}
					<button onClick={this.authenticate.bind(this)} className="btn">Connect with Google</button>				
					<button onClick={() => firebase.auth().signOut()}>sign out</button>
				</p>
			</div>
		);
	}
}

export default App;
