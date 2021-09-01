import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {tickerApi} from '../components/ticker/ticker.service';

export const store = configureStore({
    reducer: {
        [tickerApi.reducerPath]: tickerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tickerApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
