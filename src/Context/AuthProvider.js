import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase/config'
import { useLocation, useNavigate } from "react-router-dom"
;

export const AuthContext = React.createContext()

function AuthProvider({children}) {
    const [user, setUser] = React.useState({})
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                console.log({user})
                const { displayName, email, photoURL, uid } = user;
                setUser({displayName, email, photoURL, uid})
                if(location.pathname !== "/profile") navigate("/chat-room")
            }

        })
        
        return () => unSubscribe()
        
    },[navigate, location.pathname])

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;