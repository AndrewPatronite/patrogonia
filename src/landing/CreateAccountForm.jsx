import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { isValidPassword } from './helper/passwordValidator';
import LinkButton from '../control/LinkButton';
import './CreateAccountForm.css';

const CreateAccountForm = ({
    createAccount,
    backToLoginClick,
    errorMessage,
    setErrorMessage,
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [name, setName] = useState('');

    const submitNewAccount = (e) => {
        if (isEmpty(username)) {
            setErrorMessage('Username is required');
        } else if (
            isValidPassword(password, confirmedPassword, setErrorMessage)
        ) {
            const location = {
                mapName: 'Atoris',
                rowIndex: 6,
                columnIndex: 7,
                facing: 'down',
            };
            const player = {
                name,
                username,
                password,
                location,
            };
            createAccount(player);
        }
        e.preventDefault();
    };

    return (
        <form className="create-account" onSubmit={submitNewAccount}>
            <label>
                Player name:
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
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
            <label>
                Confirm:
                <input
                    type="password"
                    name="confirmedPassword"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                />
            </label>
            <label className="invalid">{errorMessage}</label>
            <input type="submit" value={'Create'} />
            <LinkButton
                onClick={() => {
                    setErrorMessage('');
                    backToLoginClick();
                }}
                label="Back to login"
            />
        </form>
    );
};

export default CreateAccountForm;
