export default {
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
        return await fetch('/signin',{
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
                if(res.status !== 401)
                    return res.json().then(data => data);
                else
                    return {isAuthenticated: false, user: {name : "", email : ""}};
            })
    }
};
