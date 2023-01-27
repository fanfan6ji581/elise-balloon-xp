import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gameDataSlice from "../slices/gameDataSlice";
import gameSettingSlice from "../slices/gameSettingSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
      gameData: gameDataSlice,
      gameSetting: gameSettingSlice,
  },
});
