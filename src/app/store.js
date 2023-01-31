import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gameDataSlice from "../slices/gameDataSlice";
import gameSettingSlice from "../slices/gameSettingSlice";
import adminSlice from "../slices/adminSlice";
import attendantSlice from "../slices/attendantSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    attendant: attendantSlice,
    counter: counterReducer,
    gameData: gameDataSlice,
    gameSetting: gameSettingSlice,
  },
});

store.subscribe(() => {
  const { admin, attendant } = store.getState();
  if (admin) {
    if (admin.loginAdmin) {
      localStorage.setItem('loginAdmin', admin.loginAdmin);
    } else {
      localStorage.removeItem('loginAdmin');
    }
  }

  if (attendant) {
    if (attendant.loginAttendant) {
      localStorage.setItem('loginAttendant', attendant.loginAttendant);
    } else {
      localStorage.removeItem('loginAttendant');
    }
  }
})