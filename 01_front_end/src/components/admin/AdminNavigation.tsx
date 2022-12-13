import React from 'react'
import { NavLink } from 'react-router-dom';
import './Styles.css';

export default function AdminNavigation () {
  return (
    <nav className='primary-nav'>
        <NavLink className='item5 courier'  to='/'>  Home </NavLink>
        <NavLink className='item1 courier'  to='/admin'> Dashboard </NavLink>
        <NavLink className='item2 courier'  to='/admin/users'>  Users </NavLink>
        <NavLink className='item3 courier'  to='/admin/books'>  Books </NavLink>
        <NavLink className='item4 courier'  to='/admin/requests'>  Requests </NavLink>
    </nav>
  )
}
