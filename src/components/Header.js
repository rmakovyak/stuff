import React from 'react';
import firebase from 'firebase';
import styles from './Header.css';

export default class Header extends React.Component {
    render() {
        return (
            <div className='row header'>
                <div
                    onClick={() =>
                        document.getElementById('sidebar')
                            .classList.add('sidebar--open')}
                    className='col-1 d-md-none'
                >
                    <i className='fa fa-bars header__sidebar-toggle'></i>
                </div>
                <div className='col-11'>
                    <p className='header__user-info'>
                        Welcome, {this.props.userName}
                        <button
                            onClick={() => firebase.auth().signOut()}
                            className='btn btn-secondary btn-sm header__logout'>
                            logout
                    </button>
                    </p>
                </div>
            </div>
        );
    }
}