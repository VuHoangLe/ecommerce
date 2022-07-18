import React from 'react';
import './section.scss';

function Section(props) {
    return <div className="section">{props.children}</div>;
}

export default Section;
