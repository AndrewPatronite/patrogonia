import styled from 'styled-components';
import { Theme } from './ThemeContext';

const ThemedHeader = styled.h5`
    color: ${(props: { theme: Theme }) => props.theme.headingColor};
    margin: 0 0 12px 0;
`;

export default ThemedHeader;
