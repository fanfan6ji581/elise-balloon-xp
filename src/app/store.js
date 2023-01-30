import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gameDataSlice from "../slices/gameDataSlice";
import gameSettingSlice from "../slices/gameSettingSlice";
import adminSlice from "../slices/adminSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    counter: counterReducer,
    gameData: gameDataSlice,
    gameSetting: gameSettingSlice,
  },
});

store.subscribe(() => {
  const { admin } = store.getState();
  if (admin)  {
    if (admin.loginUser) {
      localStorage.setItem('loginUser', admin.loginUser);
    } else {
      localStorage.removeItem('loginUser');
    }
  }
})