import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('sidebar--open')
}

export default function Sidebar() {
    return (
        <div>
            <div onClick={() => closeSidebar()}>
                <i className='fa fa-times d-md-none sidebar__close'></i>
            </div>
            <NavLink
                to="/inbox"
                onClick={() => closeSidebar()}
                activeClassName="sidebar__item--active"
                className='sidebar__item sidebar__item--inbox'
            >
                <i className='fa fa-inbox sidebar__item-icon'></i>
                <span className='sidebar__item-label'>Inbox</span>
            </NavLink>
            <NavLink
                to="/today"
                onClick={() => closeSidebar()}
                activeClassName="sidebar__item--active"
                className='sidebar__item'
            >
                <i className='fa fa-star sidebar__item-icon'></i>
                <span className='sidebar__item-label'>Today</span>
            </NavLink>
            <NavLink
                to="/upcoming"
                onClick={() => closeSidebar()}
                activeClassName="sidebar__item--active"
                className='sidebar__item'
            >
                <i className='fa fa-calendar-alt sidebar__item-icon'></i>
                <span className='sidebar__item-label'>Upcoming</span>
            </NavLink>
        </div>
    );
}