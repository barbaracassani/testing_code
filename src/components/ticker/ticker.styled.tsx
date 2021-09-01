import styled from 'styled-components';
import {colours} from '../../app.styled';

export const StyledTicker = styled.div`
    width: 100%;
    padding: 1rem;
    margin-top: 1.5rem;
    border-radius: 10px;
    background-color: ${colours.medium}
`;

export const StyledError = styled.div`
    color: ${colours.highlight}
`;
