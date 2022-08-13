import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Loading() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const userInformation = useSelector((state) => state.userInfo.value[0]);
    useEffect(() => {
        if (userInformation) {
            navigate('/loading/cart', { state: userInformation });
        }
    }, [userInformation, navigate]);
    return <div>Loading...</div>;
}

export default Loading;
