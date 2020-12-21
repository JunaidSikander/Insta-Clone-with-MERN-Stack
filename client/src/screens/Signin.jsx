import React, {useState} from 'react';
import {Link} from "react-router-dom";
import M from 'materialize-css';
import authService from "../services/authService";


const Signin = ({history: {push}}) => {
    const [user, setUser] = useState({email: '', password: ''});

    const onChange = e => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value});
    };

    const resetForm = () => {
        setUser({email: "", password: ""});
    };

    const onSubmit = e => {
        e.preventDefault();
        authService.signIn(user)
            .then(data => {
                if (!data)
                    return M.toast({html: 'Unable to Sign in User', classes: '#b71c1c red darken-3'});
                const {message} = data;
                if (message.msgError)
                    return M.toast({html: message.msgBody, classes: '#b71c1c red darken-3'});
                M.toast({html: message.msgBody, classes: '#43a047 green darken-1'});
                resetForm();
                push('/');
            })
    };

    return (
        <div className="card-container">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <form onSubmit={onSubmit}>
                    <input type="email" placeholder="email" name='email' value={user.email} onChange={onChange}
                           required/>
                    <input type="password" placeholder="password" name='password' value={user.password}
                           onChange={onChange} required/>
                    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" type="submit">
                        Login
                    </button>
                </form>
                <h5>
                    <Link to='/signup'>Don't have an account</Link>
                </h5>
            </div>
        </div>
    )
};

export default Signin;
