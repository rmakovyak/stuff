import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import config from './config';
import firebase from 'firebase';

ReactDOM.render(<App />,
    document.getElementById('root'));

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        ReactDOM.render(<App name={user.displayName} />,
            document.getElementById('root'));
    } else {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function (result) {
        }).catch(function (error) {
            document.write(error.message);
        });
    }
});

registerServiceWorker();
