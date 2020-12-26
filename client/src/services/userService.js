export default {
    getUserProfile: async userId => {
        return await fetch(`/user/${userId}`)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
    }
};
