import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './components/Content';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { checkAuth } from './App.helper';
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
			<div className='container-fluid'>
				<Router>
					<div className='row'>
						<div className='col-sm-3 sidebar' id='sidebar'>
							<Sidebar />
						</div>
						<div className='col-12 col-sm-9 content'>
							<Header userName={this.props.name} />
							<Content />
						</div>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
