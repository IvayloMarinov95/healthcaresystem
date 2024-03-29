import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from '../features/roles/roles-slice';
import userReducer from '../features/user/user-slice';
import isLoadingReducer from '../features/spinner/isLoading-slice';
import toastReducer from '../features/toast/toast-slice';

export const store = configureStore({
  reducer: {
    roles: rolesReducer,
    user: userReducer,
    isLoading: isLoadingReducer,
    toast: toastReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
