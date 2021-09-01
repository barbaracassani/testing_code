import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export interface StateType {
    [key: string]: number;

    bid: number;
    ask: number;
}

// were it for real, I'd use socket.io instead of short polling
export const tickerApi = createApi({
    reducerPath: 'tickerApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}),
    endpoints: (builder) => ({
        getTickerByLabel: builder.query({
            query: (l) => `ticker/${l}`,
            transformResponse: (response: number[], meta): StateType => {
                return {
                    ask: response[2],
                    bid: response[0]
                }
            }
        }),
    }),
})

// Export hooks for usage in functional components
export const {useGetTickerByLabelQuery} = tickerApi
