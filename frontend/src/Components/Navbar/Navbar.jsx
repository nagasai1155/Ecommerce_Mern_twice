import React from 'react'
import './Navbar.css';
import logo from '../Assests/logo.png'
import cart_icon from '../Assests/cart_icon.png'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="main">

        <div className="logo-name">
            <img src={logo} alt="logo" />
            <h1>My Website</h1>
        </div>
        <div className="navbar">
            <ul className='navbar-ul'>
              
              <Link to='/'>  <li>shop</li></Link>
              <Link to='/mens'>  <li>men</li></Link>
                <Link to='/womens'>  <li>women</li></Link>
              <Link to='/kids'>  <li>kids</li></Link>
                <Link>  <li>Contact</li></Link>
               

            </ul>
        </div>
        <div className="login-cart">
                    <div className="btn">
                <Link to="/login">    <button>login</button></Link>
                    </div>
                   <div className="cart-logo">
                  <Link to="/cart">    <img src={cart_icon} alt="" /></Link>
                   </div>

        </div>
    </div>
  )
}

export default Navbar