import styled from 'styled-components';
import {colours} from '../../app.styled';

export const StyledSidebar = styled.nav`
    padding: 1rem;
    background-color: ${colours.dark};
    margin-top: 1.5rem;
    border-radius: 10px;
    & ul {
        & li {
            margin: .5rem;
            &:first-child {
                margin-top: 0;
            }
        & a:link, & a:visited {
            text-decoration: none;
        }
        & a:link, & a:visited, & a.active {
            color: ${colours.light};
            }
        & a:hover {
            color: ${colours.accents};
            }  
        & a.active, & a:hover {
            text-decoration: underline;
        }      
        }
    }
`;
