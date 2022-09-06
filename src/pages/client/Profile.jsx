import { useState, useContext, useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { updateField } from '../../firebase/services';

import { AppContext } from '../../context/AppProvider';

import Grid from '../../components/grid';

const INPUTS = [
    {
        name: 'displayName',
        type: 'text',
        required: true,
        message: 'Can not empty',
    },
    {
        name: 'address',
        type: 'text',
        required: true,
        message: 'Can not empty',
    },
    {
        name: 'phone',
        type: 'text',
        required: true,
        pattern: '^[0-9]*$',
        message: 'Must be number',
    },
    {
        name: 'photoURL',
        type: 'text',
        required: true,
        message: 'Can not empty',
    },
];
function Profile() {
    const navigate = useNavigate();

    const { userDetails } = useContext(AppContext);
    const [updateUser, setUpdateUser] = useState({
        displayName: '',
        address: '',
        phone: Number,
        photoURL: '',
    });

    useEffect(() => {
        setUpdateUser(userDetails[0]);
    }, [userDetails]);

    // save the info that user type
    const handleInputChange = (e) => {
        setUpdateUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    // update profile
    const onSubmit = (e) => {
        e.preventDefault();

        // Validate
        let isValid = true;
        INPUTS.forEach((elmt) => {
            if (!elmt.pattern || isValid === false) {
                return;
            } else {
                let regex = new RegExp(elmt.pattern);
                if (!regex.test(updateUser[elmt.name])) {
                    isValid = false;
                }
            }
        });

        if (isValid) {
            // update user's profile to firestore
            updateField('users', updateUser.docId, updateUser);
            alert('Update profile successfully');
            navigate(-1);
        }
    };

    return (
        <Grid col={2} smCol={1} gap={20}>
            <form className="edit__form" action="" autoComplete="off">
                <Typography variant="h3" className="edit__form__title">
                    Profile
                </Typography>
                {INPUTS.map((item, index) => {
                    return (
                        <div className="form__wrapper" key={index}>
                            <label htmlFor="">{item.name.toUpperCase()}</label>
                            <div className="input__wrapper">
                                <input
                                    name={item.name}
                                    type={item.type}
                                    value={(updateUser && updateUser[item.name]) || ''}
                                    onChange={(e) => handleInputChange(e)}
                                    pattern={item.pattern}
                                    required={item.required}
                                />
                                <span>{item.message}</span>
                            </div>
                        </div>
                    );
                })}
                <Box
                    sx={{
                        display: 'flex',
                        width: '70%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Button variant="contained" onClick={() => navigate(-1)}>
                        Back
                    </Button>

                    <Button variant="contained" type="submit" onClick={(e) => onSubmit(e)}>
                        Save
                    </Button>
                </Box>
            </form>

            <div>
                <Typography variant="h3" className="edit__form__title">
                    Avatar preview
                </Typography>
                <img className="avatar-preview" src={updateUser?.photoURL} alt="" />
            </div>
        </Grid>
    );
}

export default Profile;
