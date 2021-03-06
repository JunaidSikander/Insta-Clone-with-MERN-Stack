import React, {useContext, useEffect} from 'react';
import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import {Home, Profile, Signin, Signup, SubscribePost, UploadPost, UserProfile} from './screens';
import {AuthContext} from "./context/AuthContext";

const Routing = () => {
    const {isAuthenticated} = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (!isAuthenticated)
            history.push('/signin');
    }, []);
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/profile" component={Profile}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/profile/:userId" component={UserProfile}/>
            <Route path="/upload_post" component={UploadPost}/>
            <Route path="/subscribed_posts" component={SubscribePost}/>
        </Switch>
    );
};

function App() {
    return (
        <Router>
            <NavBar/>
            <Routing/>
        </Router>
    );
}

export default App;
