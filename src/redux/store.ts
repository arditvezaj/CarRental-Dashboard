import {configureStore} from '@reduxjs/toolkit'
import {apiSlice} from './services/api-slice'
import authReducer from './modules/auth/slice'
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
