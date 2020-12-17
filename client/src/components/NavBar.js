import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';

const NavBar = props => (
    <div>
        <nav>
            <div className="nav-wrapper white">
                <Link to="/" className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/signin">Sign in</Link></li>
                    <li><Link to="/signup">Sign up</Link></li>
                    <li><Link to="/profile">Proflie</Link></li>
                    <li><Link to="/upload_post">Upload Posts</Link></li>
                </ul>
            </div>
        </nav>
    </div>
);

export default NavBar;
