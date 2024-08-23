import React from 'react'
import './Navbar.css';
import logo from '../Assests/logo.png'
import cart_icon from '../Assests/cart_icon.png'
const Navbar = () => {
  return (
    <div className="main">

        <div className="logo-name">
            <img src={logo} alt="logo" />
            <h1>My Website</h1>
        </div>
        <div className="navbar">
            <ul className='navbar-ul'>
                <li>shop</li>
                <li>men</li>
                <li>women</li>
                <li>kids</li>
                <li>Contact</li>

            </ul>
        </div>
        <div className="login-cart">
                    <button>login</button>
                    <img src={cart_icon} alt="" />

        </div>
    </div>
  )
}

export default Navbar