import React, { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from './ThemeContext';
import styled from 'styled-components';

const SwitchWrapper = styled.label`
    display: flex;
    padding-bottom: 5px;
`;

const ThemeSwitch = () => {
    const {
        theme: { name },
        switchTheme,
    } = useContext(ThemeContext);
    const isLightTheme = name === 'light';

    return (
        <SwitchWrapper className="switch-wrapper">
            Light theme:&nbsp;
            <Switch
                checked={isLightTheme}
                onChange={switchTheme}
                height={20}
                width={40}
                activeBoxShadow="0 0 2px 2px #00f"
                onColor="#bbb"
            />
        </SwitchWrapper>
    );
};

export default ThemeSwitch;
