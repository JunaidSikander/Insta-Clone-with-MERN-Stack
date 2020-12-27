export default {
    getUserProfile: async userId => {
        return await fetch(`/user/${userId}`)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
    },
    followUser: async userId => {
        return await fetch('/user/follow', {
            method: 'PUT',
            body: JSON.stringify({followId: userId}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
    },
    unfollowUser: async userId => {
        return await fetch('/user/unfollow', {
            method: 'PUT',
            body: JSON.stringify({unfollowId: userId}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
    },
    updatePicture: async pic => {
        return await fetch('/user/update_pic', {
            method: 'PUT',
            body: JSON.stringify({pic}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
    }
};
