import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trialIndex: 0,
    timerProgress: 0,
    progressStartTime: 0,
    showMoneyOutcome: false,
    showAfterClickDelay: false,

    // internal data
    pretask: null,
    ballAQty: [],
    resetHistory: [],
    choiceHistory: [],
    outcomeHistory: [],
    missHistory: [],
    reactionHistory: [],
};

const pretaskSlice = createSlice({
    name: 'pretask',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        recordChoice: (state, action) => {

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
        reset: (state, action) => {
            const pretask = action.payload;
            state.pretask = pretask;
            state.trialIndex = 0;
            state.ballAQty = [pretask.ballAQty];
        },
        next: (state, action) => {
            state.trialIndex += 1;
            state.ballAQty.push(state.ballAQty[state.trialIndex - 1] + state.pretask.x);

        }
    },
});

export const {
    recordMulResp,
    setProgressStartTime,
    setTimerProgress,
    nextTrial,
    setShowMoneyOutcome,
    reset,
    next,
} = pretaskSlice.actions;

export const trialIndex = (state) => state.pretask.trialIndex;
export const ballAQty = (state) => state.pretask.ballAQty;
export const showAfterClickDelay = (state) => state.pretask.showAfterClickDelay;
export const timerProgress = (state) => state.pretask.timerProgress;
export const showMoneyOutcome = (state) => state.pretask.showMoneyOutcome;
export const choiceHistory = (state) => state.pretask.choiceHistory;
export const outcomeHistory = (state) => state.pretask.outcomeHistory;
export const missHistory = (state) => state.pretask.missHistory;
export const reactionHistory = (state) => state.pretask.reactionHistory;
export const pretask = (state) => state.pretask.pretask;

export default pretaskSlice.reducer;
