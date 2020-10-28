import React, { useState } from 'react';
import LinkButton from '../control/LinkButton';
import ThemeSwitch from '../components/theme/ThemeSwitch';

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
            <ThemeSwitch />
            <input type="submit" value={'Login'} />
            <LinkButton
                onClick={() => {
                    setErrorMessage('');
                    createAccountClick();
                }}
            >
                Create an account
            </LinkButton>
        </form>
    );
};

export default LoginForm;
