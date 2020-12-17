import React from 'react';

const UploadPost = () => (
    <div className='card input-field card-center'>
        <input type='text' placeholder='Title'/>
        <input type='text' placeholder='Body'/>
        <div className="file-field input-field">
            <div className="btn #64b5f6 blue lighten-2">
                <span>Upload Image</span>
                <input type="file" />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
        </div>
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" type="submit" name="action">
            Upload post
        </button>
    </div>
);

export default UploadPost;
