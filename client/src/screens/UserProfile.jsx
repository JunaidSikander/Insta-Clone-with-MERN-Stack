import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useParams} from 'react-router-dom'
import userService from "../services/userService";

const UserProfile = () => {
    const [userProfile, setProfile] = useState(null);
    const {user} = useContext(AuthContext);
    const {userId} = useParams();

    useEffect(() => {
        userService.getUserProfile(userId)
            .then(profile => {
                setProfile(profile)
            })
    }, []);

    return (
        userProfile ?
            <>
                <div className="profile-container">
                    <div className='profile-subcontainer'>
                        <div>
                            <img className="image-container"
                                 alt=""
                                 src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjV8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
                            />
                        </div>
                        <div>
                            <h4>{userProfile.user.name}</h4>
                            <h5>{userProfile.user.email}</h5>
                            <div className="info-container">
                                <h6> {userProfile.posts.length} posts</h6>
                                <h6> 40 followers</h6>
                                <h6> 40 following</h6>
                            </div>
                        </div>
                    </div>
                    <div className="gallery">
                        {
                            userProfile.posts.map(post => (
                                <img key={post._id} className="item" alt={post.title} src={post.photo}/>
                            ))
                        }
                    </div>
                </div>
            </>
            : <h2>Loading...</h2>
    )
};

export default UserProfile;
