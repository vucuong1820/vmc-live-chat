import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase/config'
import { useNavigate } from "react-router-dom"
;

export const AuthContext = React.createContext()

function AuthProvider({children}) {
    const [user, setUser] = React.useState({})
    const navigate = useNavigate();

    React.useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                const { displayName, email, photoURL, uid} = user;
                setUser({displayName, email, photoURL, uid})
                navigate("/chat-room")
            }

        })
        
        return () => unSubscribe()
        
    },[navigate])

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;