import { createContext, useEffect, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthContext = createContext();
function AuthenProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasUser, setHasUser] = useState(null);

    //check user status
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setHasUser({ displayName, email, uid, photoURL });
                setIsLoading(false);
            } else {
                setHasUser(null);
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
