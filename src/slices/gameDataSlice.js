import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    money: 0,
    trialNumber: 1,
    balloonValues: [],
    balloonSpeed: [],
    hiddenCurrValue: 0,
    hiddenCurrSpeed: 0,
    lastClickedMul: 0,
    timerProgress: 0,
    gameOver: false,

    isDisplayingMoneyOutcome: false,
    // DEBUG INFO
    _numAbberations: 0,
    _numDangerzone: 0,
    _dangerZoneSpeedReset: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    _dangerZoneResetCalc: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const gameDataSlice = createSlice({
    name: 'gameData',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        endGame: (state) => {
            state.gameOver = true;
        },
        setMoneyOutcome: (state, action) => {
            state.isDisplayingMoneyOutcome = !!action.payload;
        },
        resetTimer: (state) => {
            state.timerProgress = 0;
        },
        incrementTimer: (state, action) => {
            if (state.timerProgress >= 100) return;
            state.timerProgress += action.payload;
        },
        setLastClickedMul: (state, action) => {
            state.lastClickedMul = action.payload;
        },
        addMoney: (state, action) => {
            state.money += action.payload;
        },
        nextTrial: (state) => {
            state.trialNumber++;
        },
        resetGame: (state, action) => {

            state._numAbberations = 0
            state._numDangerzone = 0
            state._dangerZoneSpeedReset = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            state._dangerZoneResetCalc = ["0.00", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            const dangerZoneChance = 100 * fractionParse(action.payload.dangerZoneChance)
            const aberrationChance = 100 * fractionParse(action.payload.aberrationChance)
            const lambda = fractionParse(action.payload.lambda)

            let cumSum = 1;
            for (let i = 1; i < 10; i++) {
                let probShift = (1 - Math.exp(-i * lambda))
                const expected = probShift * cumSum
                cumSum -= expected
                state._dangerZoneResetCalc[i] = expected.toFixed(2)
            }

            const speedIncrement = action.payload.delta
            let balloonValues = [];
            let balloonSpeed = [];
            let isCooldown = true;
            let lastBalloonValue = 2;
            let lastBalloonSpeed = 0;
            //let speedIncrement = 2;
            let depthIntoDangerZone = 1;
            for (let i = 0; i < action.payload.numberOfTrials * 2; i++) {
                if (balloonValues.length >= action.payload.numberOfTrials) {
                    break;
                }
                // TODO: Temporarily disable cooldown
                if (isCooldown) {
                    // balloonValues.push(lastBalloonValue);
                    // balloonValues.push(lastBalloonValue);
                    // balloonValues.push(lastBalloonValue);
                    // balloonSpeed.push(0);
                    // balloonSpeed.push(0);
                    // balloonSpeed.push(0);
                    isCooldown = false;
                    // continue;
                }

                let num = 100 * Math.random();

                if (lastBalloonSpeed === 0) {
                    // dangerzone chance
                    if (num <= dangerZoneChance) {
                        lastBalloonSpeed += speedIncrement;
                        balloonSpeed.push(lastBalloonSpeed)
                        balloonValues.push(lastBalloonValue);
                        state._numDangerzone++;
                        continue;
                    }
                    // aberration chance
                    else if (num <= aberrationChance + dangerZoneChance) {
                        balloonValues.push(lastBalloonValue * -1)
                        balloonValues.push(lastBalloonValue)
                        balloonSpeed.push(lastBalloonSpeed)
                        balloonSpeed.push(lastBalloonSpeed)
                        isCooldown = true;
                        state._numAbberations++;
                        continue;
                    }
                    else {
                        balloonValues.push(lastBalloonValue)
                        balloonSpeed.push(lastBalloonSpeed)
                    }
                } else {   // in danger zone
                    let probShift = 100 * (1 - Math.exp(-depthIntoDangerZone * lambda))
                    if (num <= probShift) {
                        state._dangerZoneSpeedReset[depthIntoDangerZone]++
                        depthIntoDangerZone = 1
                        lastBalloonValue *= -1
                        balloonValues.push(lastBalloonValue)
                        lastBalloonSpeed = 0
                        balloonSpeed.push(lastBalloonSpeed)
                        isCooldown = true
                    } else {
                        depthIntoDangerZone += 1
                        lastBalloonSpeed += speedIncrement;
                        balloonValues.push(lastBalloonValue)
                        balloonSpeed.push(lastBalloonSpeed)
                    }
                }
            }
            state.money = 0
            state.trialNumber = 1
            state.balloonValues = balloonValues
            state.balloonSpeed = balloonSpeed
            state.hiddenCurrValue = 0
            state.hiddenCurrSpeed = 0
            state.lastClickedMul = 0
            state.timerProgress = 0
            state.gameOver = false
        }
    },
});

// function addGamePoint(numTrials, speedArr, valueArr,speed,value) {
//     if (speedArr.length > numTrials || valueArr.length > numTrials) return true;
//     valueArr.push(value)
//     speedArr.push(speed)
//     return false;
// }

function fractionParse(a) {
    const split = a.split('/');
    return split[0] / split[1];
}

export const { addMoney, nextTrial, resetGame, setLastClickedMul,
    incrementTimer, resetTimer, endGame, setMoneyOutcome } = gameDataSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const money = (state) => state.gameData.money;
export const trials = (state) => state.gameData.trialNumber;
export const balloonValuePoints = (state) => state.gameData.balloonValues;
export const balloonSpeedPoints = (state) => state.gameData.balloonSpeed;
export const currBalloonValue = (state) => state.gameData.hiddenCurrValue;
export const lastClickedMul = (state) => state.gameData.lastClickedMul;
export const timerProgress = (state) => state.gameData.timerProgress;
export const gameOver = (state) => state.gameData.gameOver;
export const isDisplayingMoneyOutcome = (state) => state.gameData.isDisplayingMoneyOutcome;

export default gameDataSlice.reducer;
