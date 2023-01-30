import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginUser: localStorage.getItem('loginUser'),
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        login(state, action) {
            state.loginUser = action.payload;
        },
        logout(state) {
            state.loginUser = null;
        },
    },
})

export const {
    login,
    logout,
} = adminSlice.actions
export const loginUser = (state) => state.admin.loginUser;
export default adminSlice.reducer