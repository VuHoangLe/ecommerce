import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase/config';
import { addUser, delUser } from '../../redux/user-info/userInfoSlice';
import CircularProgress from '@mui/material/CircularProgress';

function Authen({ children }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                dispatch(addUser({ displayName, email, uid, photoURL }));
                setIsLoading(false);
            } else {
                dispatch(delUser());
                setIsLoading(false);
            }
        });
    }, [dispatch]);
    return <div>{isLoading ? <CircularProgress color="secondary" /> : children}</div>;
}

export default Authen;
