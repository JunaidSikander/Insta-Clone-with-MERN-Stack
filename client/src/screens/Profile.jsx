import React, {useEffect, useState, useContext} from 'react';
import postService from "../services/postService";
import {AuthContext} from "../context/AuthContext";

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(() => {
        postService.myPost()
            .then(posts => {
                setPosts(posts);
            })
    }, []);
    return (
        <div className="profile-container">
            <div className='profile-subcontainer'>
                <div>
                    <img className="image-container"
                         alt=""
                         src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjV8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
                    />
                </div>
                <div>
                    <h4>{user.name}</h4>
                    <div className="info-container">
                        <h6> 40 posts</h6>
                        <h6> 40 followers</h6>
                        <h6> 40 following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    posts.map(post => (
                        <img key={post._id} className="item" alt={post.title} src={post.photo}/>
                    ))
                }
            </div>
        </div>
    )
};

export default Profile;
