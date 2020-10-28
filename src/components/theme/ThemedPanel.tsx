import React, { useContext } from 'react';
import styled from 'styled-components';
import { Theme, ThemeContext } from './ThemeContext';
import ThemedHeader from "./ThemedHeader";

interface PanelProps {
    padding: string;
    flexDirection: 'row' | 'column';
    height?: string;
    width?: string;
    theme: Theme;
}

const Panel = styled.div`
        padding: ${(props: PanelProps) => props.padding};
        border-radius: 5px;
        display: flex;
        flex-direction: ${(props: PanelProps) => props.flexDirection};
        ${(props: PanelProps) =>
            props.height ? `height: ${props.height};` : ''}
        ${(props: PanelProps) => (props.width ? `width: ${props.width};` : '')}
        background-color: ${(props: PanelProps) => props.theme.backgroundColor};
        border: 2px solid ${(props: PanelProps) => props.theme.borderColor};
        color: ${(props: PanelProps) => props.theme.textColor};
        label {
            color: ${(props: PanelProps) => props.theme.labelColor};
        }
        span {
          color: ${(props: PanelProps) => props.theme.textColor};
        }
        justify-content: space-between;
        .row {
          margin-bottom: 10px;
        }
    `;

const ThemedPanel = ({
    children,
    heading,
    className,
    height,
    width,
    flexDirection = 'row',
    padding = '25px',
}: {
    children: any;
    heading?: string;
    className?: string;
    height?: string;
    width?: string;
    flexDirection?: 'row' | 'column';
    padding?: string;
}) => {
    const { theme } = useContext(ThemeContext);

    return (
        <Panel
            className={`themed-panel ${className ? className : ''}`}
            padding={padding}
            flexDirection={flexDirection}
            height={height}
            width={width}
            theme={theme}
        >
            {heading && (
                <ThemedHeader className="themed-panel-header" theme={theme}>
                    {heading}
                </ThemedHeader>
            )}
            {children}
        </Panel>
    );
};

export default ThemedPanel;
