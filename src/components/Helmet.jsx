import React from 'react';
import { useEffect } from 'react';

function Helmet(props) {
    document.title = 'Yolo - ' + props.title;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <>{props.children}</>;
}

export default Helmet;
