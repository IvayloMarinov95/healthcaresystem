import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IsLoadingState {
  value: boolean;
}

const initialState: IsLoadingState = {
  value: false,
};

const isLoading = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.value = action.payload;
    },
  },
});

export const { setIsLoading } = isLoading.actions;
export default isLoading.reducer;
