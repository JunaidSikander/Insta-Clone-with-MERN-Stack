import React, {useContext} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import '../App.css';
import authService from "../services/authService";
import M from "materialize-css";

const NavBar = ({history: {push}}) => {
    const {isAuthenticated} = useContext(AuthContext);
    const onLogout = () => {
        authService.logout()
            .then(data => {
                const {success} = data;
                if (!success)
                    return M.toast({html: 'Unable to Logout User', classes: '#b71c1c red darken-3'});
                M.toast({html: 'Successfully Logout', classes: '#43a047 green darken-1'});
                push('/signin');
            })
    };

    return (
        <div>
            <nav>
                <div className="nav-wrapper white">
                    <Link to={isAuthenticated ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
                    <ul id="nav-mobile" className="right">
                        {
                            isAuthenticated ?
                                <>
                                    <li key='1'><Link to="/profile">Profile</Link></li>
                                    <li key='2'><Link to="/upload_post">Upload Posts</Link></li>
                                    <li key='3'><Link to="/subscribed_posts">My Following Posts</Link></li>
                                    <li key='4'>
                                        <button className="btn waves-effect waves-light #b71c1c red darken-3"
                                                onClick={onLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                                :
                                <>
                                    <li><Link to="/signin">Sign in</Link></li>
                                    <li><Link to="/signup">Sign up</Link></li>
                                </>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
};

export default withRouter(NavBar);
