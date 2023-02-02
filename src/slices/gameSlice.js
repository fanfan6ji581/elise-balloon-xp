import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trialIndex: 0,
    timerProgress: 0,
    progressStartTime: 0,
    showMoneyOutcome: false,
    showAfterClickDelay: false,

    // internal data
    xpData: {},
    xpConfig: {},
    mulHistory: [],
    moneyHistory: [],
    missHistory: [],
    timerHistory: [],
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

            if (!missed) {
                state.timerHistory[trialIndex] = Date.now() - state.progressStartTime;
            }

            // should show outcome
            if (missed || mul !== 0) {
                state.showAfterClickDelay = true;
                // state.showMoneyOutcome = true;
            } else {
                // when click pass
                state.timerProgress = 0;
                state.trialIndex++;
            }
        },
        setShowMoneyOutcome: (state, action) => {
            state.showMoneyOutcome = action.payload;
            // means delay has finished
            state.showAfterClickDelay = false;
        },
        setTimerProgress: (state, action) => {
            state.timerProgress = Math.min(100, action.payload);
        },
        setProgressStartTime: (state, action) => {
            state.progressStartTime = action.payload;
        },
        nextTrial: (state) => {
            state.showMoneyOutcome = false;
            state.timerProgress = 0;
            state.trialIndex++;
        },
        onLogin: (state, action) => {
            const loginAttdant = action.payload;
            state.xpData = loginAttdant.xpData;
            state.xpConfig = loginAttdant.xpConfig;
            const { numberOfTrials } = state.xpConfig;
            state.mulHistory = new Array(numberOfTrials).fill(0);
            state.moneyHistory = new Array(numberOfTrials).fill(0);
            state.missHistory = new Array(numberOfTrials).fill(false);
            state.timerHistory = new Array(numberOfTrials).fill(0);
        },
    },
});

export const { recordMulResp, setProgressStartTime,
    setTimerProgress, nextTrial, onLogin, setShowMoneyOutcome } = gameSlice.actions;

export const trialIndex = (state) => state.game.trialIndex;
export const showAfterClickDelay = (state) => state.game.showAfterClickDelay;
export const timerProgress = (state) => state.game.timerProgress;
export const showMoneyOutcome = (state) => state.game.showMoneyOutcome;
export const mulHistory = (state) => state.game.mulHistory;
export const moneyHistory = (state) => state.game.moneyHistory;
export const missHistory = (state) => state.game.missHistory;

export default gameSlice.reducer;
