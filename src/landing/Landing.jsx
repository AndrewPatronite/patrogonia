import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import CreateAccountForm from './CreateAccountForm';
import LoginForm from './LoginForm';
import Credits from '../credits/Credits';
import HttpStatus from '../state/api/HttpStatus';
import preval from 'preval.macro';
import { faDragon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinkButton from '../control/LinkButton';
import { ThemeContext } from '../components/theme/ThemeContext';

const LandingDiv = styled.div`
    background-color: ${(props) => props.theme.backgroundColor};
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    form {
        padding: 50px 50px 50px 50px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border: 2px solid ${(props) => props.theme.borderColor};
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;

        label {
            margin-bottom: 10px;

            input {
                margin-left: 5px;
            }
        }

        .link-button {
            margin: 0;
            margin-top: 15px;
        }
    }

    label {
        font-size: 15px;
        color: ${(props) => props.theme.labelColor};

        &.invalid {
            color: red;
            font-size: 12px;
        }
    }
`;

const Title = styled.h1`
    color: ${(props) => props.theme.headingColor};
    text-align: left;
    text-shadow: 3px 3px #aaaaaa;
    font-size: 50px;
`;

const LandingFooter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .fa-dragon {
        margin-bottom: 10px;
    }

    label {
        font-size: 12px;
    }

    .credits {
        margin-bottom: 5px;
    }
`;

const Landing = ({ login, createAccount, showInstructions }) => {
    const [returning, setReturning] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const lastUpdate = preval`module.exports = new Date().toLocaleString();`;
    const { theme } = useContext(ThemeContext);

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
        <LandingDiv className="landing" theme={theme}>
            <Title className="landing-title" theme={theme}>
                Chronicles of Patrogonia
            </Title>
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
            <LandingFooter className="landing-footer">
                <FontAwesomeIcon icon={faDragon} />
                <label>Last update: {lastUpdate}</label>
                <label>Recommended: Chrome with viewport: 1000 x 1000</label>
                <LinkButton onClick={() => showInstructions()}>
                    How to play
                </LinkButton>
                <Credits />
            </LandingFooter>
        </LandingDiv>
    );
};

export default Landing;
