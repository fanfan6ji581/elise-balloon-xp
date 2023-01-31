import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginAttendant: localStorage.getItem('loginAttendant'),
}

const attendantSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        login(state, action) {
            state.loginAttendant = action.payload;
        },
        logout(state) {
            state.loginAttendant = null;
        },
    },
})

export const {
    login,
    logout,
} = attendantSlice.actions
export const loginAttendant = (state) => state.attendant.loginAttendant;
export default attendantSlice.reducer