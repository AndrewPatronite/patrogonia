import React from 'react';
import './LinkButton.css';

const LinkButton = ({ onClick, label }) => (
    <button type="button" className="link-button" onClick={onClick}>
        {label}
    </button>
);

export default LinkButton;
