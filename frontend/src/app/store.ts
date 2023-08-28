import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from '../features/roles/roles-slice';

export const store = configureStore({
    reducer: { roles: rolesReducer }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;