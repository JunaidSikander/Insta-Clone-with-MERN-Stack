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
    signUp: async user => {
        return await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
    },
    signIn: async user => {
        return await fetch('/signin', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
    },
    isAuthenticated: async () => {
        return await fetch('/authenticated')
            .then(res => {
                if (res.status !== 401)
                    return res.json().then(data => data);
                else
                    return {isAuthenticated: false, user: {name: "", email: ""}};
            })
    },
    logout: async () => {
        return await fetch('/logout')
            .then(res =>res.json())
            .then(data => data)
            .catch(err => console.log(err))
    }
};
