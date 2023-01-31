import { useDispatch, useSelector } from "react-redux";
import coins from '../../assets/coins.png';
import coinsdown from '../../assets/coinsdown.png';
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
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

    if (missedTrial) {
        return (
            <Typography variant="h5" align="center">
                Missed trial, you lost ${afkTimeoutCost}!
            </Typography>
        )
    }

    return (
        <>
            <MoneyPopup
                variants={changeMoneyVariants}
                animate={(trialIndexS % 2 === 0) ? "left" : "right"}
            >
                <Box
                    height={"100%"}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                >
                    {(moneyEarned < 0 ?
                        <h3>{'You just lost $' + -moneyEarned}</h3>
                        :
                        <h3>{'You just won $' + moneyEarned}</h3>
                    )}
                    <img
                        src={moneyEarned < 0 ? coinsdown : coins}
                        alt={"coins"}
                    />
                </Box>
            </MoneyPopup>
        </>
    )
}

