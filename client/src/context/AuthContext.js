import React, {createContext, useEffect, useState} from 'react';
import authService from "../services/authService";

export const AuthContext = createContext();

export default ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        authService.isAuthenticated()
            .then(data => {
                setUser(data.user);
                setIsAuthenticated(data.isAuthenticated);
                setIsLoaded(true);
            })
    }, []);

    return (
        <div>
            {!isLoaded ?
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
                :
                <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                    {children}
                </AuthContext.Provider>
            }
        </div>
    )
}
