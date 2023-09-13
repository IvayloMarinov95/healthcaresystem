import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoleObject {
  _id: string;
  role: string;
  users: Array<string>;
}

interface RolesState {
  value: Array<RoleObject>;
}

const initialState: RolesState = {
  value: [],
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoles(state, action: PayloadAction<Array<RoleObject>>) {
      state.value = [...action.payload];
    },
  },
});

export const { setRoles } = rolesSlice.actions;
export default rolesSlice.reducer;
