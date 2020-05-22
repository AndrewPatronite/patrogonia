import React, { useState } from 'react';
import CreateAccountForm from './CreateAccountForm';
import LoginForm from './LoginForm';
import './Landing.css';
import Credits from '../credits/Credits';
import HttpStatus from '../state/api/HttpStatus';
import preval from 'preval.macro'
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Landing = ({ login, createAccount }) => {
    const [returning, setReturning] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const lastUpdate = preval`module.exports = new Date().toLocaleString();`

    const handleCreateAccount = (player) =>
        createAccount(player, (error) => {
            if (
                error &&
                error.response &&
                Object.is(error.response.status, HttpStatus.CONFLICT)
            ) {
                setErrorMessage('Username already exists');
            } else {
                setErrorMessage('Failed to create player');
            }
        });

    const handleLogin = (username, password) => {
        login(username, password, () => setErrorMessage('Invalid login'));
    };

    return (
        <div className="landing">
            <h1 className="title">Chronicles of Patrogonia</h1>
            {returning ? (
                <LoginForm
                    login={handleLogin}
                    createAccountClick={() => setReturning(false)}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                />
            ) : (
                <CreateAccountForm
                    createAccount={handleCreateAccount}
                    backToLoginClick={() => setReturning(true)}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                />
            )}
            <div className="spacer" />
            <div className="landing-footer">
                <FontAwesomeIcon icon={faDragon} />
                <label>
                    Last update: {lastUpdate}
                </label>
                <label>Recommended: Chrome with viewport: 1000 x 1000</label>
                <Credits />
            </div>
        </div>
    );
};

export default Landing;
