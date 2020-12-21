export default {
    uploadImage: async image => {
        const photoData = new FormData();
        photoData.append('file', image);
        photoData.append('upload_preset', 'Insta-Clone');
        photoData.append('cloud_name', 'junaidsikander');
        return await fetch('https://api.cloudinary.com/v1_1/junaidsikander/image/upload', {
            method: 'POST',
            body: photoData
        }).then(res => res.json())
            .then(data => data.url)
            .catch(err => console.log(err))
    },
    uploadPost: async post => {
        return await fetch('/posts/create_post', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
    }
}
