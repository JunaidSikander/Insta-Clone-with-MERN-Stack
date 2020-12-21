import React, {useState} from 'react';
import postService from "../services/postService";
import M from 'materialize-css';

const UploadPost = ({history: {push}}) => {
    const [post, setPost] = useState({title: '', body: '', photo: ''});
    const [image, setImage] = useState('');

    const onChange = e => {
        e.preventDefault();
        setPost({...post, [e.target.name]: e.target.value});
    };

    const onSubmit = async () => {
        await postService.uploadImage(image)
            .then(url => setPost({...post, photo: url}));
        postService.uploadPost(post)
            .then(data => {
                if (!data)
                    return M.toast({html: 'Unable to Upload post', classes: '#b71c1c red darken-3'});
                const {message} = data;
                if (message.msgError)
                    return M.toast({html: message.msgBody, classes: '#b71c1c red darken-3'});
                M.toast({html: message.msgBody, classes: '#43a047 green darken-1'});
                push('/');
            })
    };
    return (
        <div className='card input-field card-center'>
            <input name='title' type='text' placeholder='Title' value={post.title} onChange={onChange}/>
            <input name='body' type='text' placeholder='Body' value={post.body} onChange={onChange}/>
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue lighten-2">
                    <span>Upload Image</span>
                    <input name='image' type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={onSubmit}>
                Upload post
            </button>
        </div>
    )
};

export default UploadPost;
