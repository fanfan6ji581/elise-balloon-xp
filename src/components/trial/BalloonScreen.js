import balloon from '../../assets/balloon.png';
import scale from '../../assets/scale.png';
import coins from '../../assets/coins.png';
import coinsdown from '../../assets/coinsdown.png';
import { motion } from "framer-motion"
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    addMoney,
    nextTrial,
    balloonValuePoints,
    endGame,
    incrementTimer,
    lastClickedMul,
    money,
    resetGame,
    resetTimer,
    setLastClickedMul,
    timerProgress,
    trials,
    setMoneyOutcome,
    isDisplayingMoneyOutcome,
} from "../../slices/gameDataSlice";
import { afkTimeout, afkTimeoutCost, costSwitch, numberOfTrials, outcomeShowTime } from "../../slices/gameSettingSlice";


const initialValue = 480;
const shadow = 'brightness(120%) contrast(150%) drop-shadow(0px 0px 7px rgba(0,128,128,1.0)'
const BalloonImage = styled(motion.img)`
    border-radius: 3px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: ${initialValue / 5 + 'px'};
    margin-botton: ${initialValue / 84 + 'px'};
    margin-top: ${initialValue / 84 + 'px'};
    -webkit-filter: ${props => props.lastBalloon ? shadow : ''});
    filter: ${props => props.lastBalloon ? shadow : ''});
`

const HiddenBalloonImage = styled(motion.img)`
    visibility: hidden;
    background: transparent;
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: ${initialValue / 17 + 'px'};
    margin-botton: ${initialValue / 84 + 'px'};
    margin-top: ${initialValue / 84 + 'px'};
`

const MoneyPopup = styled(motion.div)`
    // border: black 1px solid;
    height: 100%;
`

export function BalloonScreen() {
    const dispatch = useDispatch();


    const currMoney = useSelector(money);
    const outcomeTimeS = useSelector(outcomeShowTime);
    const afkTimeoutS = useSelector(afkTimeout);
    const valuePoints = useSelector(balloonValuePoints);
    const progress = useSelector(timerProgress);
    const maxTrialNumber = useSelector(numberOfTrials);
    const gameSettings = useSelector(state => state.gameSetting)
    const afkTimeoutCostt = useSelector(afkTimeoutCost);
    const costToSwitch = useSelector(costSwitch);
    const showOutcome = useSelector(isDisplayingMoneyOutcome);

    const trialNum = useSelector(trials);
    const [lastMultiplier, setLastMultiplier] = useState(0);
    const [missedTrial, setMissedTrial] = useState(false);
    const [lastOutcomeDollars, setLastOutcomeDollars] = useState(0);

    let loadingInterval = useRef(null);

    const clickedAction = (multiplier) => {
        let changeValue = valuePoints[trialNum] * multiplier;
        if (lastMultiplier * multiplier < 0) {
            changeValue -= costToSwitch;
        }
        setLastOutcomeDollars(changeValue);
        dispatch(addMoney(changeValue));
        _setMoneyOutcome(multiplier !== 0);

        dispatch(setLastClickedMul(multiplier));
        setLastMultiplier(multiplier);
        resetGameTimer();
        if (multiplier === 0) {
            goToNextTrial();
        } else {
            loadingInterval.current = setTimeout(() => {
                _setMoneyOutcome(false);
                goToNextTrial();
            }, outcomeTimeS * 1000)
        }
    }

    const _setMoneyOutcome = (value) => {
        dispatch(setMoneyOutcome(value));
    }

    const resetInternalState = () => {
        _setMoneyOutcome(false);
        setMissedTrial(false);
        setLastMultiplier(0);
    }

    const resetGameTimer = () => {
        dispatch(resetTimer());
        clearInterval(loadingInterval.current);
    }

    const goToNextTrial = () => {
        dispatch(nextTrial());
        restartGameTimer();
    };

    const restartGameTimer = () => {
        resetGameTimer();
        clearInterval(loadingInterval.current);
        loadingInterval.current = setInterval(() => {
            dispatch(incrementTimer(0.5));
        }, afkTimeoutS * 5);
    }

    // only run once at beginning
    useEffect(() => {
        resetGameTimer();
        resetInternalState();
        restartGameTimer();
    }, [])

    useEffect(() => {
        if (trialNum >= maxTrialNumber) {
            _setMoneyOutcome(true);
            resetGameTimer();
            loadingInterval.current = setTimeout(() => {
                dispatch(endGame())
            }, outcomeTimeS * 1000)
        }

        if (!showOutcome && progress >= 100) {
            resetGameTimer();
            dispatch(addMoney(-afkTimeoutCostt));
            setMissedTrial(true);
            loadingInterval.current = setTimeout(() => {
                setMissedTrial(false);
                goToNextTrial();
            }, outcomeTimeS * 1000)
        }

    }, [progress, resetGameTimer, dispatch, afkTimeoutCostt, outcomeTimeS, restartGameTimer, goToNextTrial, maxTrialNumber, trialNum]);

    useEffect(() => {
        dispatch(resetGame(gameSettings))
        return () => {
            clearInterval(loadingInterval.current)
        }
    }, [dispatch, gameSettings]);


    return (
        <>
            <Grid
                container
            >
                <Grid item xs={7}>
                    <ChoiceSection
                        showOutcome={showOutcome}
                        missedTrial={missedTrial}
                        lastMultiplier={lastMultiplier}
                        clickedAction={clickedAction}
                    />
                </Grid>
                <Grid item xs={5}>
                    <MoneyOutcome
                        missedTrial={missedTrial}
                        lastOutcomeDollars={lastOutcomeDollars}
                    />
                </Grid>
            </Grid>
        </>
    )
}

function MoneyOutcome({ missedTrial, lastOutcomeDollars }) {
    const showOutcome = useSelector(isDisplayingMoneyOutcome);
    const afkTimeoutCostt = useSelector(afkTimeoutCost);
    const trialNum = useSelector(trials);
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

    if (missedTrial) {
        return (
            <Stack
                height={"100%"}
                direction="column"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
            >
                <h2>Missed trial, you lost ${afkTimeoutCostt}!</h2>
            </Stack>
        )
    }

    return (
        <>
            {showOutcome && trialNum >= 1 &&
                <MoneyPopup
                    variants={changeMoneyVariants}
                    animate={(trialNum % 2 === 0) ? "left" : "right"}
                >
                    <Stack
                        height={"100%"}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                    >
                        {(lastOutcomeDollars < 0 ?
                            <h3>{'You just lost $' + Math.abs(lastOutcomeDollars)}</h3>
                            :
                            <h3>{'You just won $' + lastOutcomeDollars}</h3>
                        )}
                        <img
                            src={lastOutcomeDollars < 0 ? coinsdown : coins}
                            alt={"coins"}
                        />
                    </Stack>
                </MoneyPopup>
            }
        </>
    )

}


function ChoiceSection({ showOutcome, missedTrial, lastMultiplier, clickedAction }) {

    const costToSwitch = useSelector(costSwitch);
    const lastClicked = useSelector(lastClickedMul);

    const variants = {
        hover: {
            scale: 1.3,
            transition: { yoyo: Infinity }
        },
        top: {
            y: 0,
            transition: { duration: 5, ease: "linear" }
        },
        idle: {
            y: Math.random(),
            x: Math.random(),
            transition: { yoyo: Infinity }
        }
    }

    return (
        <>
            <Grid
                style={showOutcome || missedTrial ? { filter: "grayscale(100%)", pointerEvents: "none" } : {}}
                container
                direction="row"
                alignItems="center"
            >
                {[2, 1, 0, 0, -1, -2].map((x, i) => {
                    if (x !== 0) return (
                        <>
                            <Grid item xs={6}>
                                <Typography variant={'h4'} align="right">
                                    <b>{x}  &mdash;</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Tooltip
                                    title={lastMultiplier * x < 0 ? <h2>{'Changing screen costs $' + costToSwitch}</h2> : ""}
                                >
                                    <BalloonImage
                                        lastBalloon={lastClicked === x}
                                        variants={variants}
                                        whileHover="hover"
                                        animate={{
                                            y: Math.random() * 5,
                                            x: Math.random() * 5,
                                            transition: { yoyo: Infinity, duration: 3 * Math.random() + 1 }
                                        }}
                                        src={balloon} alt="balloon"
                                        onClick={() => {
                                            clickedAction(x)
                                        }}
                                    />
                                </Tooltip>
                            </Grid>
                        </>
                    );
                    else return (
                        <>
                            <Grid item xs={6}>
                                <HiddenBalloonImage />
                            </Grid>
                            <Grid item xs={6}>
                                <HiddenBalloonImage />
                            </Grid>
                        </>
                    )
                }
                )

                }
                <Grid item xs={12}>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                    >
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: "#00A8F3",
                                padding: "8px 15px",
                                fontSize: "18px",
                                color: "black"
                            }}
                            onClick={() => {
                                clickedAction(0)
                            }}
                        >
                            Pass
                        </Button>

                    </Box>
                </Grid>
            </Grid>
        </>
    )
}