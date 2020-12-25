import React, {useContext, useEffect, useState} from 'react';
import postService from "../services/postService";
import {AuthContext} from "../context/AuthContext";


const Home = () => {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        postService.getAllPost()
            .then(posts => setPosts(posts))
    }, []);

    const likePost = id => {
        postService.likePost(id)
            .then(result => {
                const newData = posts.map(post => post._id === result._id ? result : post);
                setPosts(newData);
            })
    };

    const unlikePost = id => {
        postService.unlikePost(id)
            .then(result => {
                const newData = posts.map(post => post._id === result._id ? result : post);
                setPosts(newData);
            })
    };

    return (
        <div className="home-container">
            {
                posts.map(post => {
                    return (
                        <div className="card home-card" key={post._id}>
                            <h5> {post.postedBy.name}</h5>
                            <div className="card-image">
                                <img alt=""
                                     src={post.photo}/>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{color: 'red'}}>favorite</i>
                                {
                                    post.likes.includes(user._id)
                                        ?
                                        <i className="material-icons"
                                           onClick={() => unlikePost(post._id)}>thumb_down</i>
                                        :
                                        <i className="material-icons"
                                           onClick={() => likePost(post._id)}>thumb_up</i>
                                }
                                <h6>{post.likes.length} Likes</h6>
                                <h6>{post.title}</h6>
                                <p>{post.body}</p>
                                <input type="text" placeholder="add a comment"/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Home;
