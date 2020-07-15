import React, { createContext, useState, useEffect } from 'react'
import HiddenValues from '../common/getTokenHiddnVales'

export const AuthContext = createContext();

const initialAuth = {
    userId: '111',
    role: 'TestRole',
    userName: 'TestUsername',
    firstName: 'TestFirstname',
    lastName: 'TestLastname'
}

const AuthContextProvider = (props) => {

    const [auth, setAuth] = useState(initialAuth);
    useEffect(() => {
        var profileValues = HiddenValues.getHiddenValues()
        console.log('Auth Context UseEffect ',profileValues.UserId);
        setAuth({
            userId: profileValues.UserId,
            role: profileValues.UserRole,
            userName: profileValues.UserName,
            firstName: profileValues.FirstName,
            lastName: profileValues.LastName
        });
    }, []);

    return (
        <AuthContext.Provider value={{...auth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
