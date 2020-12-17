import React from 'react';

const Home = () => (
    <div className="home-container">
        <div className="card home-card">
            <h5> Junaid</h5>
            <div className="card-image">
                <img alt=""
                     src="https://images.unsplash.com/photo-1480926965639-9b5f63a0817b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8d2FsbHBhcGVyfGVufDB8MnwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"/>
            </div>
            <div className="card-content">
                <i className="material-icons" style={{color: 'red'}}>favorite</i>
                <h6>title</h6>
                <p>body</p>
                <input type="text" placeholder="add a comment"/>
            </div>
        </div>
    </div>
);

export default Home;
