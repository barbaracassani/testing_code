import styled from 'styled-components';
import {Col, Container, Row} from 'react-awesome-styled-grid';

export const colours = {
    dark: '#313639',
    light: '#f5f5f5',
    medium: '#dde0e0',
    highlight: '#FF0508',
    down: '#6cad26',
    up: '#4d910c',
    accents: '#a5c8e5'
};

export const StyledApp = styled.div`
    width: 100%;
    height: 100%;
    font-size: 1.8rem;
`;

export const StyledContainer = styled(Container)`
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
`

export const StyledLeftCol = styled(Col)``;

export const StyledTopRow = styled(Row)`
    & h1 {
        padding: 1rem;
        padding-bottom: 0;
    }
`;
