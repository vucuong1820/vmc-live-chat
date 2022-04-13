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
        const unSubscribe = onAuthStateChanged(auth,  (userInfo) => {
            if(userInfo) {
                const { providerId } = userInfo?.providerData[0]
                const { displayName, email, photoURL, uid } = userInfo;
                setUser({ displayName, email, photoURL, uid, providerId })               
                return;
            }
            // reset user info
            setUser({})
        })
       
        return () => {
            unSubscribe()
        }        
    },[navigate, location.pathname, ])
    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
}

export default React.memo(AuthProvider);