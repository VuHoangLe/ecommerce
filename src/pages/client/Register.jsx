import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, IconButton, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';

import Helmet from '../../components/Helmet';
import '../../features/client/authentication/components/authen.scss';

import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDocument } from '../../firebase/services';
import { FacebookAuthProvider, getAdditionalUserInfo, signInWithPopup } from 'firebase/auth';

function Register() {
    const navigate = useNavigate();

    // Yup schema
    const schema = yup.object({
        userName: yup
            .string()
            .required('User name is required')
            .min(3, 'User name has at least 3 characters')
            .max(14, 'User name cannot exceed more than 14 characters'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password has at least 6 characters')
            .max(14, 'Password cannot exceed more than 14 characters'),
        rePassword: yup
            .string()
            .required('Confirm Password is required')
            .oneOf([yup.ref('password')], 'Passwords do not match'),
    });

    // react-hook-form use yup schema
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [rePassword, setRePassword] = useState('');

    // create user
    useEffect(() => {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: displayName,
            }).then(() => {
                addDocument('users', {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    providerId: 'firebase.com',
                    products: [],
                });
                alert('Register successfully');
                if (window.history.state && window.history.state.idx > 0) {
                    navigate(-2);
                } else {
                    navigate('/', { replace: true });
                }
            });
        });
    }, [navigate, email, password, displayName]);

    // End

    // Register with fb
    const fbAuth = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                const details = getAdditionalUserInfo(result);

                if (details?.isNewUser) {
                    addDocument('users', {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL + '?height=500&access_token=' + accessToken,
                        uid: user.uid,
                        providerId: details.providerId,
                        products: [],
                    });
                }
                alert('Login successfully');
                if (window.history.state && window.history.state.idx > 0) {
                    navigate(-2);
                } else {
                    navigate('/', { replace: true });
                }
            })
            .catch((error) => {
                console.log('login with fb fail');
            });
    };

    const onSubmit = (data) => {
        setEmail(data.email);
        setPassword(data.password);
        setDisplayName(data.userName);
        setRePassword(data.rePassword);
    };

    return (
        <Helmet title="Register">
            <div className="authen">
                <div className="authen__image">
                    <img src="https://office.antara.cloud/img/login-img.png" alt="" />
                </div>
                <form className="authen__form" action="" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Typography variant="h3" className="authen__form__title">
                        Register
                    </Typography>
                    <TextField {...register('userName')} type="text" label="Username" variant="outlined" />
                    <span className="authen__error">{errors.userName?.message}</span>
                    <TextField {...register('email')} type="email" label="Email" variant="outlined" />
                    <span className="authen__error">{errors.email?.message}</span>

                    <TextField {...register('password')} type="password" label="Password" variant="outlined" />
                    <span className="authen__error">{errors.password?.message}</span>

                    <TextField
                        {...register('rePassword')}
                        type="password"
                        label="Confirm password"
                        variant="outlined"
                    />
                    <span className="authen__error">{errors.rePassword?.message}</span>

                    <Button fullWidth variant="contained" type="submit">
                        Register
                    </Button>
                    <Typography variant="h6">
                        Allready have an account? <Link to="/login">Log in now</Link>
                    </Typography>
                    <Box>
                        <IconButton
                            variant="contained"
                            onClick={() => {
                                fbAuth();
                            }}>
                            <FacebookIcon
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    color: '#4267b2',
                                }}
                            />
                        </IconButton>
                    </Box>
                </form>
            </div>
        </Helmet>
    );
}

export default Register;
