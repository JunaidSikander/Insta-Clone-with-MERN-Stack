import React,{useEffect,useContext} from 'react';
import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import {Home, Profile, Signin, Signup, UploadPost} from './screens';
import {AuthContext} from "./context/AuthContext";

const Routing = () => {
    const authContext = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if(authContext.isAuthenticated)
            history.push('/');
        else
            history.push('/signin')
    },[]);

    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/upload_post" component={UploadPost}/>
        </Switch>
    );
}

function App() {
    return (
            <Router>
                <NavBar/>
                <Routing/>
            </Router>
    );
}

export default App;
