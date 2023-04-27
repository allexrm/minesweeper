import React from 'react';

import { useNavigate } from 'react-router';

// General button
const Button = props => {

    return (
        <button {...props} className={`btn ${props?.className || ''}`} >
            {props.children}
        </button>
    );
};


// Button that navigates to a url
const NavigationButton = props => {
    const navigate = useNavigate();
    const { to } = props;

    return (
        <Button {...props} onClick={()=>navigate(to)} >
            {props.children}
        </Button>
    );
};
export { Button, NavigationButton };