import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  value: object;
}

const initialState: UserState = {
  value: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<object>) {
      state.value = { ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
