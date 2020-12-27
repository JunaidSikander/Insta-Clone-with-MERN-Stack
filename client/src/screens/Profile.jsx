import React, {useContext, useEffect, useState} from 'react';
import postService from "../services/postService";
import userService from "../services/userService";
import {AuthContext} from "../context/AuthContext";
import M from 'materialize-css'

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);
    const [image, setImage] = useState('');
    useEffect(() => {
        postService.myPost()
            .then(posts => {
                setPosts(posts);
            })
    }, []);
    useEffect(() => {
        if (image) {
            postService.uploadImage(image)
                .then(url => {
                    userService.updatePicture(url)
                        .then(data => {
                            const {message} = data;
                            if (message.msgError)
                                return M.toast({html: message.msgBody, classes: '#b71c1c red darken-3'});
                            M.toast({html: message.msgBody, classes: '#43a047 green darken-1'});
                            window.location.reload();
                        })
                })
        }
    }, [image]);

    const updatePicture = (file) => {
        setImage(file);
    };
    return (
        <div className="profile-container">
            <div className='profile-subcontainer'>
                <div className='profile-update'>
                    <img className="image-container"
                         alt=""
                         src={user?.pic}
                    />
                    <div className="file-field input-field">
                        <div className="btn #64b5f6 blue lighten-2">
                            <span>Update Pic</span>
                            <input type="file" onChange={(e) => updatePicture(e.target.files[0])}/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
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
