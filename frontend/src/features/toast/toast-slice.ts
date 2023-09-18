import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  value: object;
}

const initialState: ToastState = {
  value: {},
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast(state, action: PayloadAction<ToastState>) {
      state.value = { ...action.payload };
    },
  },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
