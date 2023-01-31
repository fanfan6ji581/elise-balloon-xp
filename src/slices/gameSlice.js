import { createSlice } from '@reduxjs/toolkit';

const loginAttdant = JSON.parse(localStorage.getItem('loginAttendant'))

const initialState = {
    trialIndex: 0,
    timerProgress: 0,
    showMoneyOutcome: false,

    // internal data
    xpData: loginAttdant.xpData,
    xpConfig: loginAttdant.xpConfig,
    mulHistory: new Array(loginAttdant.xpConfig.numberOfTrials).fill(0),
    moneyHistory: new Array(loginAttdant.xpConfig.numberOfTrials).fill(0),
    missHistory: new Array(loginAttdant.xpConfig.numberOfTrials).fill(false),
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        recordMulResp: (state, action) => {
            const { xpData, xpConfig, trialIndex } = state;
            const { mul, missed } = action.payload;

            // keep mul history
            state.mulHistory[trialIndex] = mul;
            state.missHistory[trialIndex] = missed;
            let money = xpData.balloonValues[trialIndex] * mul;
            // if different with previous one, add up a switch cost
            if (trialIndex > 0) {
                money -= state.mulHistory[trialIndex - 1] * mul < 0 ? xpConfig.costToSwitch : 0;
            }
            state.moneyHistory[trialIndex] = money;

            // should show outcome
            if (missed || mul !== 0) {
                state.showMoneyOutcome = true;
            } else {
                // when click pass
                state.timerProgress = 0;
                state.trialIndex++;
            }
        },
        incrementTimer: (state, action) => {
            state.timerProgress = Math.min(100, state.timerProgress + action.payload);
        },
        nextTrial: (state) => {
            state.showMoneyOutcome = false;
            state.timerProgress = 0;
            state.trialIndex++;
        },
    },
});

export const { recordMulResp, incrementTimer, nextTrial } = gameSlice.actions;

export const trialIndex = (state) => state.game.trialIndex;
export const timerProgress = (state) => state.game.timerProgress;
export const showMoneyOutcome = (state) => state.game.showMoneyOutcome;
export const mulHistory = (state) => state.game.mulHistory;
export const moneyHistory = (state) => state.game.moneyHistory;
export const missHistory = (state) => state.game.missHistory;

export default gameSlice.reducer;
