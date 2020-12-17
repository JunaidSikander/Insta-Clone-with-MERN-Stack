import React from 'react';
import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Home, Profile, Signin, Signup, UploadPost} from './screens';


function App() {
    return (
        <div>
            <Router>
                <NavBar/>
                <Route exact path="/" component={Home}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/upload_post" component={UploadPost}/>
            </Router>
        </div>
    );
}

export default App;
