import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';

// Initialize Firebase
// TODO: move out config to json
const config = {
    apiKey: "AIzaSyCWmkbzASl-pe9riHclSUxHvYGMnkv7YMo",
    authDomain: "stuff-65ace.firebaseapp.com",
    databaseURL: "https://stuff-65ace.firebaseio.com",
    projectId: "stuff-65ace",
    storageBucket: "",
    messagingSenderId: "876399061225"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        ReactDOM.render(<App name={user.displayName}/>, document.getElementById('root'));
    } else {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function (result) {
            const token = result.credential.accessToken;
            const user = result.user;
            ReactDOM.render(<App name={user.displayName}/>, document.getElementById('root'));
        }).catch(function (error) {
            document.write(error.message);
        });
    }
});

registerServiceWorker();
