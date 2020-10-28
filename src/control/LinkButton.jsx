import React, { forwardRef, useContext } from 'react';
import './LinkButton.css';
import { ThemeContext } from '../components/theme/ThemeContext';

const LinkButton = forwardRef(({ onClick, children }, ref) => {
    const {
        theme: { name },
    } = useContext(ThemeContext);
    const isLightTheme = name === 'light';

    return (
        <button
            ref={ref}
            type="button"
            className={`link-button ${isLightTheme ? 'light' : 'dark'}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
});

export default LinkButton;
