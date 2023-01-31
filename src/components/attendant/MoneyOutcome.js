import { useDispatch, useSelector } from "react-redux";
import coins from '../../assets/coins.png';
import coinsdown from '../../assets/coinsdown.png';
import { motion } from "framer-motion";
import { Box, Typography, CardMedia, CardContent } from "@mui/material";
import styled from "styled-components";
import { showMoneyOutcome, moneyHistory, missHistory, trialIndex, nextTrial } from "../../slices/gameSlice";
import { useEffect, useRef } from "react";

const MoneyPopup = styled(motion.div)`
    height: 100%;
`

export default function MoneyOutcome({ xpData, xpConfig }) {
    const dispatch = useDispatch();
    const loadingInterval = useRef(null);
    const showMoneyOutcomeS = useSelector(showMoneyOutcome);
    const moneyHistoryS = useSelector(moneyHistory);
    const missHistoryS = useSelector(missHistory);
    const trialIndexS = useSelector(trialIndex);
    const { afkTimeoutCost, outcomeShowTime } = xpConfig;

    const moneyEarned = moneyHistoryS[trialIndexS];
    const missedTrial = missHistoryS[trialIndexS];

    const changeMoneyVariants = {
        left: {
            opacity: [0, 1]
        },
        right: {
            opacity: [1, 0, 1]
        },
        hidden: {
            opacity: 0
        }
    }

    useEffect(() => {
        if (showMoneyOutcomeS) {
            loadingInterval.current = setTimeout(() => {
                dispatch(nextTrial())
            }, outcomeShowTime * 1000)
        }

        return () => clearInterval(loadingInterval.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showMoneyOutcomeS])


    if (!showMoneyOutcomeS) {
        return <></>
    }

    return (
        <>
            <MoneyPopup
                variants={changeMoneyVariants}
                animate={(trialIndexS % 2 === 0) ? "left" : "left"}
            >
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    {!missedTrial &&
                        <CardMedia
                            component="img"
                            sx={{ width: 64, height: 64 }}
                            src={moneyEarned < 0 ? coinsdown : coins}
                            alt="coins" />
                    }
                    <CardContent>
                        {!missedTrial && <>
                            <Typography variant="h5" align="center">
                                {moneyEarned < 0 ? `You just lost $${-moneyEarned}` : `You just won $${moneyEarned}`}
                            </Typography>
                        </>}
                        {missedTrial && <>
                            <Typography variant="h5" align="center">
                                Missed trial, you lost ${afkTimeoutCost}!
                            </Typography>
                        </>}
                    </CardContent>
                </Box>
            </MoneyPopup>
        </>
    )
}

