import React,{useEffect, useState} from 'react';
import postService from "../services/postService";


const Home = () => {
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        postService.getAllPost()
            .then(posts => setPosts(posts))
    });

    return(
        <div className="home-container">
            {
                posts.map(post => {
                    return(
                        <div className="card home-card" key={post._id}>
                            <h5> {post.postedBy.name}</h5>
                            <div className="card-image">
                                <img alt=""
                                     src={post.photo} />
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{color: 'red'}}>favorite</i>
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
