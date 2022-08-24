import { createContext, useEffect, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthContext = createContext();
function AuthenProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasUser, setHasUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                console.log('login');
                setHasUser({ displayName, email, uid, photoURL });
                setIsLoading(false);
            } else {
                setHasUser(null);
                console.log('log out');
                // dispatch(delUser());
                setIsLoading(false);
            }
        });
    }, []);
    return (
        <AuthContext.Provider value={{ hasUser }}>
            {isLoading ? <CircularProgress color="secondary" /> : children}
        </AuthContext.Provider>
    );
}

export default AuthenProvider;
