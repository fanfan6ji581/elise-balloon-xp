function fractionParse(a) {
    const split = a.split('/');
    return split[0] / split[1];
}

function generateBalloonData(xp) {
    const state = {
        _numAbberations: 0,
        _numDangerzone: 0,
        _dangerZoneSpeedReset: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        _dangerZoneResetCalc: ["0.00", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };

    const dangerZoneChance = 100 * fractionParse(xp.dangerZoneChance)
    const aberrationChance = 100 * fractionParse(xp.aberrationChance)
    const lambda = fractionParse(xp.lambda)

    let cumSum = 1;
    for (let i = 1; i < 10; i++) {
        let probShift = (1 - Math.exp(-i * lambda))
        const expected = probShift * cumSum
        cumSum -= expected
        state._dangerZoneResetCalc[i] = expected.toFixed(2)
    }

    const speedIncrement = xp.delta
    let balloonValues = [];
    let balloonSpeed = [];
    let lastBalloonValue = 2;
    let lastBalloonSpeed = 0;
    let depthIntoDangerZone = 1;
    while (balloonValues.length < xp.numberOfTrials) {
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
            } else {
                depthIntoDangerZone += 1
                lastBalloonSpeed += speedIncrement;
                balloonValues.push(lastBalloonValue)
                balloonSpeed.push(lastBalloonSpeed)
            }
        }
    }

    const sum = state._dangerZoneSpeedReset.reduce((prev, next) => prev + next);
    const chances = state._dangerZoneSpeedReset.map(item => (item / sum).toFixed(2));

    // calculate aberration and shift
    const aberration = Array.from({ length: xp.numberOfTrials }).fill(0);
    const shift = Array.from({ length: xp.numberOfTrials }).fill(0);

    for (let i = 1; i < xp.numberOfTrials - 1; i++) {
        if (balloonValues[i] * balloonValues[i - 1] < 0 &&
            balloonSpeed[i - 1] === 0 &&
            balloonValues[i] * balloonValues[i + 1] < 0) {
            aberration[i] = 1
        }
        if (balloonValues[i] * balloonValues[i - 1] < 0 &&
            balloonSpeed[i - 1] !== 0 &&
            balloonValues[i] * balloonValues[i + 1] > 0) {
            shift[i] = 1
        }
    }

    return Object.assign({}, state, {
        chances,
        // data recordings
        trialIndex: 0,
        balloonValues,
        balloonSpeed,
        aberration,
        shift,
        reactionTime: Array.from({ length: xp.numberOfTrials }).fill(0),
        missed: Array.from({ length: xp.numberOfTrials }).fill(0),
        choice: Array.from({ length: xp.numberOfTrials }).fill(0),
        outcome: Array.from({ length: xp.numberOfTrials }).fill(0),
        sumOutcome: Array.from({ length: xp.numberOfTrials }).fill(0),
        pickedOutcome: Array.from({ length: xp.numberOfTrials }).fill(0),
    });
}

function extractXpData(xpData) {
    const rows = []
    const {
        balloonValues,
        balloonSpeed,
        aberration,
        shift,
        reactionTime,
        missed,
        choice,
        outcome,
        sumOutcome,
        pickedOutcome,
    } = xpData;

    for (let i = 0; i < balloonValues.length; i++) {
        rows.push({
            id: i + 1,
            value: balloonValues[i],
            speed: balloonSpeed[i],
            aberration: aberration[i],
            shift: shift[i],
            reactionTime: reactionTime[i],
            choice: choice[i],
            miss: missed[i],
            outcome: outcome[i],
            sumOutcome: sumOutcome[i],
            pickedOutcome: pickedOutcome[i],
        })
    }
    return rows;
}

export { generateBalloonData, extractXpData };