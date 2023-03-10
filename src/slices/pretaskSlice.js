import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    trialIndex: 0,
    timerProgress: 0,
    progressStartTime: 0,
    showMoneyOutcome: false,
    showAfterClickDelay: false,

    // internal data
    bets: [],
    betA: false,
    betB: false,
    betSkip: false,

    pretask: {},
    ballAQty: [],
    resetHistory: [],
    ballPickHistory: [],
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
            const { choices, missed } = action.payload
            state.choiceHistory.push(choices);
            state.reactionHistory.push(Date.now() - state.progressStartTime);
            state.missHistory.push(missed);
            if (missed) {
                state.outcomeHistory.push(state.pretask.missLose)
            } else {
                state.outcomeHistory.push(4);
            }
            // show a delay before next game start
            state.showAfterClickDelay = true;
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
            state.ballAQty.push(
                Math.min(state.pretask.totalQty,
                    state.ballAQty[state.trialIndex - 1] + state.pretask.x)
            );
        },
        reset: (state, action) => {
            const pretask = action.payload;
            state.pretask = pretask;
            state.trialIndex = 0;
            state.ballAQty = [pretask.ballAQty];
        },
        updateBet: (state, action) => {
            const { type, value } = action.payload;
            if (value && !state.bets.includes(type)) {
                state.bets.push(type);
                if (current(state.bets).length > 2) {
                    state.bets.shift();
                }
            } else {
                state.bets = state.bets.filter(v => v !== type);
            }

            state.betA = state.bets.includes("a");
            state.betB = state.bets.includes("b");;
            state.betSkip = state.bets.includes("skip");;
        },
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
    recordChoice,
    updateBet,
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
export const betA = (state) => state.pretask.betA;
export const betB = (state) => state.pretask.betB;
export const betSkip = (state) => state.pretask.betSkip;
export const bets = (state) => state.pretask.bets;

export default pretaskSlice.reducer;
