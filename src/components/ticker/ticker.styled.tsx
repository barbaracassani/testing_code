import styled from 'styled-components';
import {colours} from '../../app.styled';

export const StyledTicker = styled.div`
    width: 100%;
    padding: 1rem;
    margin-top: 1.5rem;
    border-radius: 10px;
    background-color: ${colours.medium};
    & h2 {
        padding: 2rem;
    }
`;

export const StyledError = styled.div`
    color: ${colours.highlight}
`;

export const StyledTickerGroup = styled.div`
    display: flex;
    justify-content: stretch;
`;

export const StyledTickerSingle = styled.div`
    border-radius: 5px;
    background-color: ${colours.accents};
    box-shadow: 4px 4px;
    padding: 2rem;
    margin: 2rem;
    & .up {
        color: ${colours.go_up};
    }
    & .down {
        color: ${colours.go_down};
    }
`;
