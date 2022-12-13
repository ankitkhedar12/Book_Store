import React from 'react'
import { NavLink } from 'react-router-dom';
import '../admin/Styles.css';

export default function UserNavigation () {
  return (
    <nav className='primary-nav'>
        <NavLink className='item5 courier'  to='/'> Home </NavLink>
        <NavLink className='item1 courier'  to='/userprofile'> Dashboard </NavLink>
        <NavLink className='item6 courier'  to='/user/requests'> MyRequests </NavLink>
    </nav>
  )
}
