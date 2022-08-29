import React from 'react';
import { useEffect } from 'react';

function Helmet(props) {
    // set title of page
    document.title = 'Yolo - ' + props.title;

    // reset position when change page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <>{props.children}</>;
}

export default Helmet;
