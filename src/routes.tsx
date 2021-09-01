import React, { ComponentType } from 'react';

import Home from './components/home/home';
import Ticker from './components/ticker/ticker';

export interface Route {
    path: string;
    Component: ComponentType<any>;
    id: string;
    exact?: boolean;
}

export const routes: Route[] = [
    {
        path: '/',
        Component: Home,
        id: 'home',
        exact: true,
    },
    {
        path: '/ticker/:label',
        Component: Ticker,
        id: 'ticker'
    },
    {
        path: '*',
        id: '404',
        Component: () => <div>404!</div>,
    },
];

export const routesById = routes.reduce((accu, value) => {
    accu[value.id] = value
    return accu
}, {} as {
    [key: string]: Route
})
