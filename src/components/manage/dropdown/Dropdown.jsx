import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import './dropdown.scss';

// const ClickOut = (contentRef, toggleRef) => {
//     document.addEventListener('mousedown', (e) => {
//         if (toggleRef.current && toggleRef.current.contains(e.target)) {
//             contentRef.current.classList.toggle('active');
//         } else if (contentRef.current && !contentRef.current.contains(e.target)) {
//             contentRef.current.classList.remove('active');
//         }
//     });
// };

function Dropdown({ icon, badge, renderUserInfo, content, renderFooter }) {
    const toggleRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        function handleNotification(e) {
            if (toggleRef.current && toggleRef.current.contains(e.target)) {
                contentRef.current.classList.toggle('active');
            } else if (contentRef.current && !contentRef.current.contains(e.target)) {
                contentRef.current.classList.remove('active');
            }
        }
        document.addEventListener('mousedown', handleNotification);
        return () => {
            document.removeEventListener('mousedown', handleNotification);
        };
    }, [toggleRef, contentRef]);
    return (
        <div className="dropdown">
            <button className="dropdown__toggle" ref={toggleRef}>
                {icon ? <i className={icon}></i> : ''}
                {badge ? <span className="dropdown__toggle__badge">{badge}</span> : ''}
                {renderUserInfo ? renderUserInfo : ''}
            </button>

            <div className="dropdown__content" ref={contentRef}>
                {content
                    ? content.map((item, index) => (
                          <div className="notification-item" key={index}>
                              <i className={item.icon}></i>
                              <span>{item.content}</span>
                          </div>
                      ))
                    : ''}
                {renderFooter ? <div className="dropdown__footer">{renderFooter()}</div> : ''}
            </div>
        </div>
    );
}

export default Dropdown;
