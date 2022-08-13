import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, IconButton, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';

import { auth } from '../../../firebase/config';
import { FacebookAuthProvider, getAdditionalUserInfo, signInWithPopup } from 'firebase/auth';

import { signInWithEmailAndPassword } from 'firebase/auth';

import Helmet from '../../Helmet';
import '../authen.scss';
import { useState, useEffect } from 'react';
import { addDocument } from '../../../firebase/services';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // valid form
    const schema = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password has at least 6 characters')
            .max(14, 'Password cannot exceed more than 14 characters'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // sign in with email and password

    useEffect(() => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert('Login successfully');
                navigate('/');
            })
            .catch((error) => {
                console.log('error');
            });
    }, [dispatch, email, password, navigate]);

    // End

    // Facebook authen
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
                navigate('/');
                alert('Login successfully');
            })
            .catch((error) => {});
    };
    //End

    const onSubmit = (data) => {
        setEmail(data.email);
        setPassword(data.password);
    };

    return (
        <Helmet title="Log in">
            <div className="authen">
                <div className="authen__image">
                    <img src="https://office.antara.cloud/img/login-img.png" alt="" />
                </div>
                <form className="authen__form" action="" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Typography variant="h3" className="authen__form__title">
                        Log in
                    </Typography>

                    <TextField {...register('email')} type="email" label="Email" variant="outlined" />
                    <span className="authen__error">{errors.email?.message}</span>

                    <TextField {...register('password')} type="password" label="Password" variant="outlined" />
                    <span className="authen__error">{errors.password?.message}</span>

                    <Button fullWidth variant="contained" type="submit">
                        Log in
                    </Button>
                    <Typography variant="h6">
                        New customer? <Link to="/register">Register now</Link>
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

export default Login;
