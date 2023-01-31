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
    let isCooldown = true;
    let lastBalloonValue = 2;
    let lastBalloonSpeed = 0;
    //let speedIncrement = 2;
    let depthIntoDangerZone = 1;
    while (balloonValues.length < xp.numberOfTrials) {
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

    const sum = state._dangerZoneSpeedReset.reduce((prev, next) => prev + next);
    const chances = state._dangerZoneSpeedReset.map(item => (item / sum).toFixed(2));

    return Object.assign({}, state, {
        chances,
        balloonValues,
        balloonSpeed,
    });
    // state.money = 0
    // state.trialNumber = 1
    // state.balloonValues = balloonValues
    // state.balloonSpeed = balloonSpeed
    // state.hiddenCurrValue = 0
    // state.hiddenCurrSpeed = 0
    // state.lastClickedMul = 0
    // state.timerProgress = 0
    // state.gameOver = false
}

export { generateBalloonData };