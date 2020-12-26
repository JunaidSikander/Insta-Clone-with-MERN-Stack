import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useParams} from 'react-router-dom'
import userService from "../services/userService";

const UserProfile = () => {
    const [userProfile, setProfile] = useState(null);
    const [toggleButton, setToggleButton] = useState(true);
    const {user, setUser} = useContext(AuthContext);
    const {userId} = useParams();

    useEffect(() => {
        userService.getUserProfile(userId)
            .then(profile => {
                setProfile(profile)
            })
    }, [user]);

    const onFollowClick = () => {
        userService.followUser(userId)
            .then(result => {
                setUser({...user, followers: result.followers, following: result.following})
            });
        setToggleButton(false);
    };

    const onUnFollowClick = () => {
        userService.unfollowUser(userId)
            .then(result => {
                const newFollower = userProfile.user.followers.filter(list => list !== result._id);
                setUser({...user, followers: newFollower});
            });
        setToggleButton(true);
    };

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
                                <h6> {userProfile.user.followers.length} followers</h6>
                                <h6> {userProfile.user.following.length} following</h6>
                            </div>
                            {toggleButton ?
                                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                                        onClick={onFollowClick}>
                                    Follow
                                </button>
                                :
                                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                                        onClick={onUnFollowClick}>
                                    Unfollow
                                </button>
                            }

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
