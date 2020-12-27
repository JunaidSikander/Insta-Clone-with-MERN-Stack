import React, {useContext, useEffect, useState} from 'react';
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
                         src={user?.pic}
                    />
                </div>
                <div>
                    <h4>{user.name}</h4>
                    <div className="info-container">
                        <h6> {posts?.length} posts</h6>
                        <h6> {user.followers?.length} followers</h6>
                        <h6> {user.following?.length} following</h6>
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
