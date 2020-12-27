import React, {useState, useContext} from 'react';
import {Link} from "react-router-dom";
import M from 'materialize-css';
import authService from "../services/authService";
import {AuthContext} from "../context/AuthContext";


const Signin = ({history: {push}}) => {
    const {setIsAuthenticated, setUser} = useContext(AuthContext);
    const [record, setRecord] = useState({email: '', password: ''});

    const onChange = e => {
        e.preventDefault();
        setRecord({...record, [e.target.name]: e.target.value});
    };

    const resetForm = () => {
        setRecord({email: "", password: ""});
    };

    const onSubmit = e => {
        e.preventDefault();
        authService.signIn(record)
            .then(data => {
                if (!data)
                    return M.toast({html: 'Unable to Sign in User', classes: '#b71c1c red darken-3'});
                const {message} = data;
                if (message.msgError)
                    return M.toast({html: message.msgBody, classes: '#b71c1c red darken-3'});
                M.toast({html: message.msgBody, classes: '#43a047 green darken-1'});
                resetForm();
                setUser(data.user);
                setIsAuthenticated(true);
                push('/');
            })
    };

    return (
        <div className="card-container">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <form onSubmit={onSubmit}>
                    <input type="email" placeholder="email" name='email' value={record.email} onChange={onChange}
                           required/>
                    <input type="password" placeholder="password" name='password' value={record.password}
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
