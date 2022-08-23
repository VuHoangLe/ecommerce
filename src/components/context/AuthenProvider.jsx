import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase/config';
// import { addUser, delUser } from '../../redux/user-info/userInfoSlice';
import CircularProgress from '@mui/material/CircularProgress';

export const AuthContext = createContext();
function AuthenProvider({ children }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [hasUser, setHasUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                console.log('login');
                // dispatch(addUser({ displayName, email, uid, photoURL }));
                setHasUser({ displayName, email, uid, photoURL });
                setIsLoading(false);
            } else {
                setHasUser(null);
                console.log('log out');
                // dispatch(delUser());
                setIsLoading(false);
            }
        });
    }, [dispatch]);
    return (
        <AuthContext.Provider value={{ hasUser }}>
            {isLoading ? <CircularProgress color="secondary" /> : children}
        </AuthContext.Provider>
    );
}

export default AuthenProvider;
