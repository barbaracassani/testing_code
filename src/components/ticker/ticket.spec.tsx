import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history'

import {MemoryRouter} from 'react-router';
import Ticker from './ticker';

jest.mock('react-router-dom', () => {
    return {
        useParams: () => ({
            label: 'usd'
        })
    }
})

jest.mock('./ticker.service', () => ({
    useGetTickerByLabelQuery: () => {
        return {
            isLoading: false,
            error: false,
            data: {bid: 0.532, ask: 0.458}
        }
    }
}));

describe('Ticker', () => {
    const utils = {unmount: null, container: null} as { unmount: any, container: any }
    beforeEach(() => {
        const history = createMemoryHistory()
        const {unmount, container} = render(
            <MemoryRouter>
                <Ticker history={history} location={{}} match={{params: {label: 'usd'}}}/>
            </MemoryRouter>
        );
        utils.unmount = unmount;
        utils.container = container;
    })
    afterEach(() => {
        utils.unmount()
    })
    it('should render successfully', () => {
        expect(utils.container).toBeTruthy();
    });
    it('displays the values returned from the hook', () => {
        expect(utils.container.firstChild.innerHTML).toContain('<span class="">0.532</span>')
        expect(utils.container.firstChild.innerHTML).toContain('<span class="">0.458</span>')
    })
});
