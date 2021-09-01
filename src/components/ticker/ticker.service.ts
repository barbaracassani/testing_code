import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// were it for real, I'd use socket.io instead of short polling
export const tickerApi = createApi({
    reducerPath: 'tickerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/'}),
    endpoints: (builder) => ({
        getTickerByLabel: builder.query({
            query: (l) => `ticker/${l}`,
        }),
    }),
})

// Export hooks for usage in functional components
export const { useGetTickerByLabelQuery } = tickerApi
