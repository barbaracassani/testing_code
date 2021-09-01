import React, {FunctionComponent} from 'react';
import {NavLink} from 'react-router-dom';
import {StyledSidebar} from './sidebar.styled';

import {routesById} from '../../routes';

interface SidebarProps {
}

const Sidebar: FunctionComponent<SidebarProps> = () => {
    return <StyledSidebar>
        <ul>{['tBTCUSD', 'tETHUSD', 'tBTCUST'].map((tickerLabel) => {
            return <li>
                <NavLink key={tickerLabel}
                         activeClassName='active'
                         to={routesById.ticker.path.replace(':label', tickerLabel)}>
                    {tickerLabel}
                </NavLink></li>
        })}</ul>
    </StyledSidebar>
}
export default Sidebar
