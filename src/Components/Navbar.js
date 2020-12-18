import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Style/Navbar.scss';
import Logo from '../Resources/Images/Logo.svg'

const Navbar = () => (
  <nav className="navbar" id="navbar">

      <img className="navbar-logo" src={Logo} />
 
    <div className ="navbar-center-group" >
        <div  >
            <NavLink
            exact
            activeClassName="navbar-link-active"
            className="navbar-link"
            to="/"
            >
            Home
            </NavLink>
        </div>

        <div >
            <NavLink
            activeClassName="navbar-link-active"
            className="navbar-link"
            to="/fractal_drawer"
            >
            Fractal Drawer
            </NavLink>
        </div>

        <div  >
            <NavLink
            activeClassName="navbar-link-active"
            className="navbar-link"
            to="/color_model"
            >
            Color Model
            </NavLink>
        </div>

        <div >
            <NavLink
            activeClassName="navbar-link-active"
            className="navbar-link"
            to="/shape_mover"
            >
            Shape Mover
            </NavLink>
        </div>
    </div>

    <div  >
        <NavLink
        activeClassName="navbar-link-active"
        className="navbar-link"
        to="/help"
        >
        Need Help?
        </NavLink>
    </div>
  </nav>
);

export default Navbar;