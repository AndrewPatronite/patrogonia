import React, { useState } from 'react';
import './LoginForm.css';
import LinkButton from '../control/LinkButton';

const LoginForm = ({
    login,
    createAccountClick,
    errorMessage,
    setErrorMessage,
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = (e) => {
        login(username, password);
        e.preventDefault();
    };

    return (
        <form className="account-login" onSubmit={submitLogin}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label className="invalid">{errorMessage}</label>
            <input type="submit" value={'Login'} />
            <LinkButton
                onClick={() => {
                    setErrorMessage('');
                    createAccountClick();
                }}
                label="Create an account"
            />
        </form>
    );
};

export default LoginForm;
