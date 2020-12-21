import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import '../App.css';

const NavBar = props => {
    const {isAuthenticated} = useContext(AuthContext);
    const renderList = () => {
        if (isAuthenticated)
            return [
                <li><Link to="/profile">Proflie</Link></li>,
                <li><Link to="/upload_post">Upload Posts</Link></li>
            ];
        else
            return [
                <li><Link to="/signin">Sign in</Link></li>,
                <li><Link to="/signup">Sign up</Link></li>
            ];
    };
    return (
        <div>
            <nav>
                <div className="nav-wrapper white">
                    <Link to={isAuthenticated ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
                    <ul id="nav-mobile" className="right">
                        {renderList()}
                    </ul>
                </div>
            </nav>
        </div>
    )
};

export default NavBar;
