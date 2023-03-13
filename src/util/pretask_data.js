function extractPretaskData(attendant) {
    const { pretaskRecord } = attendant;
    const rows = []
    if (!pretaskRecord) {
        return rows;
    }

    let sumOutcome = 0;
    for (let i = 0; i < pretaskRecord.ballAQty.length; i++) {
        sumOutcome += i < pretaskRecord.moneyOutcomeHistory.length ?
            pretaskRecord.moneyOutcomeHistory[i] : 0;
        rows.push(Object.assign(
            {
                id: i + 1,
                n: pretaskRecord.ballAQty[i],
                bet: i < pretaskRecord.betHistory.length ? pretaskRecord.betHistory[i] : '-',
                betResult: i < pretaskRecord.betResultHistory.length ? pretaskRecord.betResultHistory[i] : '-',
                betChosen: i < pretaskRecord.betChosenHistory.length ? pretaskRecord.betChosenHistory[i] : '-',
                reset: pretaskRecord.resetHistory.includes(i),
                moneyOutcome: i < pretaskRecord.moneyOutcomeHistory.length ? pretaskRecord.moneyOutcomeHistory[i] : '-',
                sumMoneyOutcome: sumOutcome,
                reaction: i < pretaskRecord.reactionHistory.length ? pretaskRecord.reactionHistory[i] : '-',
            },
            {
                username: attendant.username,
                gender: attendant.gender,
                age: attendant.age,
                major: attendant.major,
            },
        ))
    }
    return rows;
}

export { extractPretaskData };
