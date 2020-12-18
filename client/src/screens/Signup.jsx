import React, {useState} from 'react';
import {Link} from "react-router-dom";
import M from 'materialize-css'
import authService from "../services/authService";

const Signup = () => {
    const [user, setUser] = useState({name: "", email: "", password: ""});

    const onChange = e => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value});
    };

    const resetForm = () => {
        setUser({name: "", email: "", password: ""});
    };

    const onSubmit = e => {
        e.preventDefault();
        authService.signUp(user)
            .then(data => {
                if (!data)
                    return M.toast({html: 'Unable to Sign up User'});
                const {message} = data;
                if (message.msgError)
                    return M.toast({html: message.msgBody, classes: '#b71c1c red darken-3'});
                M.toast({html: message.msgBody});
                resetForm();
            })
    };
    return (
        <div className="card-container">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="name" name='name' value={user.name} onChange={onChange} required/>
                    <input type="email" placeholder="email" name='email' value={user.email} onChange={onChange}
                           required/>
                    <input type="password" placeholder="password" name='password' value={user.password}
                           onChange={onChange} required/>
                    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" type="submit">
                        Signup
                    </button>
                    <h5>
                        <Link to="/signin">Already have account</Link>
                    </h5>
                </form>
            </div>
        </div>
    );
};

export default Signup;
