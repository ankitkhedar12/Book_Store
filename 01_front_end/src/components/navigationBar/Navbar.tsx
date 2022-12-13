import React from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.css'

export const Navbar = () => {
  return (
    <nav className='primary-nav'>
        <NavLink className='item1 courier'  to='/'> Home </NavLink>
        <NavLink className='item2 courier'  to='/signin'>  Signin </NavLink>
        <NavLink className='item3 courier'  to='/signup'>  Signup </NavLink>
    </nav>
  )
}
