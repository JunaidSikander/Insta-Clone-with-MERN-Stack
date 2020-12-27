import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import M from 'materialize-css'
import authService from "../services/authService";

const Signup = ({history: {push}}) => {
    const [user, setUser] = useState({name: "", email: "", password: "", pic: ''});
    const [image, setImage] = useState('');

    useEffect(() => {
        if (user.pic)
            onSignUp()
    }, [user.pic]);

    const onChange = e => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value});
    };

    const resetForm = () => {
        setUser({name: "", email: "", password: ""});
    };

    const onSignUp = () => {
        authService.signUp(user)
            .then(data => {
                if (!data)
                    return M.toast({html: 'Unable to Sign up User'});
                const {message} = data;
                if (message.msgError)
                    return M.toast({html: message.msgBody, classes: '#b71c1c red darken-3'});
                M.toast({html: message.msgBody, classes: '#43a047 green darken-1'});
                resetForm();
                push('/signin');
            })
    };

    const onSubmit = e => {
        e.preventDefault();
        if (image)
            authService.uploadImage(image)
                .then(url => {
                    console.log(url);
                    setUser({...user, pic: url})
                });
        else
            onSignUp();
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
                    <div className="file-field input-field">
                        <div className="btn #64b5f6 blue lighten-2">
                            <span>Upload Pic</span>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
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
