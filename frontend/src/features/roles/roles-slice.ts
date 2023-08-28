import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RolesState {
    value: Array<object>;
}

const initialState: RolesState = {
    value: []
}

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setRoles(state, action: PayloadAction<Array<object>>) {
            state.value = [...action.payload];
        }
    }
})

export const { setRoles } = rolesSlice.actions;
export default rolesSlice.reducer;