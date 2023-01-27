import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    dangerZoneChance: "1/6",
    aberrationChance: "1/6",
    costToSwitch: 6,
    outcomeShowTime: 2,
    afkTimeout: 4,
    afkTimeoutCost: 1,
    numberOfTrials: 400,
    thresholdValue: 100,
    lambda: "1/3",
    delta: 1,
};

const gameSettingSlice = createSlice({
  name: 'gameSetting',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
        submitSettings: (state,action) => {
            state.dangerZoneChance  = action.payload.dangerZoneChance
            state.aberrationChance  = action.payload.aberrationChance
            state.costToSwitch      = action.payload.costToSwitch
            state.outcomeShowTime   = action.payload.outcomeShowTime
            state.afkTimeout        = action.payload.afkTimeout
            state.afkTimeoutCost    = action.payload.afkTimeoutCost
            state.numberOfTrials    = action.payload.numberOfTrials
            state.thresholdValue    = action.payload.thresholdValue
            state.lambda            = action.payload.lambda
            state.delta             = action.payload.delta
        }
  },
});

export const { submitSettings } = gameSettingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const dZoneChance = (state) => state.gameSetting.dangerZoneChance;
export const aChance = (state) => state.gameSetting.aberrationChance;
export const costSwitch = (state) => state.gameSetting.costToSwitch;
export const outcomeShowTime = (state) => state.gameSetting.outcomeShowTime;
export const afkTimeout = (state) => state.gameSetting.afkTimeout;
export const afkTimeoutCost = (state) => state.gameSetting.afkTimeoutCost;
export const numberOfTrials = (state) => state.gameSetting.numberOfTrials;
export const thresholdValue = (state) => state.gameSetting.thresholdValue;
export const lambda = (state) => state.gameSetting.lambda;
export const delta = (state) => state.gameSetting.delta;
export default gameSettingSlice.reducer;
