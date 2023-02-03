import { Container, Box, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import { useRef, useEffect } from "react";
import { loginAttendant } from "../../../slices/attendantSlice";
import {
    trialIndex, timerProgress, showMoneyOutcome, showAfterClickDelay,
    setTimerProgress, recordMulResp, onLogin, setProgressStartTime,
    choiceHistory, outcomeHistory, missHistory, reactionHistory,
} from "../../../slices/gameSlice";
import { login } from "../../../slices/attendantSlice";
import { useDispatch, useSelector } from "react-redux";
import TrialTimerProgress from "./TrialTimerProgress";
import PickBalloon from "./PickBalloon";
import MoneyOutcome from "./MoneyOutcome";
import ValueChart from "./ValueChart";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../../database/firebase";

const BalloonTrialPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { alias } = useParams();
    const timerInterval = useRef(null);
    const loginAttendantS = useSelector(loginAttendant);

    const trialIndexS = useSelector(trialIndex);
    const showMoneyOutcomeS = useSelector(showMoneyOutcome);
    const timerProgressS = useSelector(timerProgress);
    const showAfterClickDelayS = useSelector(showAfterClickDelay);
    const choiceHistoryS = useSelector(choiceHistory);
    const outcomeHistoryS = useSelector(outcomeHistory);
    const missHistoryS = useSelector(missHistory);
    const reactionHistoryS = useSelector(reactionHistory);

    const { xpData, xpConfig } = loginAttendantS;
    const progressStartTime = useRef(0);

    const restartGameTimer = () => {
        clearInterval(timerInterval.current);
        progressStartTime.current = Date.now();
        dispatch(setProgressStartTime(progressStartTime.current));
        timerInterval.current = setInterval(() => {
            const timePassed = (Date.now() - progressStartTime.current);
            const progress = Math.round(timePassed * 100 / xpConfig.afkTimeout);
            dispatch(setTimerProgress(progress));
        }, 30);
    }

    const storeToDB = async () => {
        const attendantRef = doc(db, "attendant", loginAttendantS.id);
        const xpRecord = {
            trialIndex: trialIndexS,
            choiceHistory: choiceHistoryS,
            outcomeHistory: outcomeHistoryS,
            missHistory: missHistoryS,
            reactionHistory: reactionHistoryS,
        };
        await updateDoc(attendantRef, { xpRecord });
        // store into local storage as well
        dispatch(login(Object.assign({}, loginAttendantS, { xpRecord })));
    }

    useEffect(() => {
        // fetch Login attdendant detail every time
        dispatch(onLogin(loginAttendantS));
        restartGameTimer();
        return () => {
            clearInterval(timerInterval.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (timerProgressS >= 100) {
            clearInterval(timerInterval.current);
            dispatch(recordMulResp({ mul: 0, missed: true }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerProgressS])

    useEffect(() => {
        if (showMoneyOutcomeS || showAfterClickDelayS) {
            // when showing delay or showing money outcome, pause progress bar
            clearInterval(timerInterval.current);
        } else {
            // when change, restart the game
            restartGameTimer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showMoneyOutcomeS, showAfterClickDelayS])

    useEffect(() => {
        // store user click into database
        if (choiceHistoryS[trialIndexS] ||
            outcomeHistoryS[trialIndexS] ||
            missHistoryS[trialIndexS] ||
            reactionHistoryS[trialIndexS]) {
            storeToDB();
        }
        if (trialIndexS === xpConfig.numberOfTrials) {
            navigate(`/xp/${alias}/payment`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trialIndexS, choiceHistoryS, outcomeHistoryS, missHistoryS, reactionHistoryS])

    return (
        <Container maxWidth="lg">
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h5" align="center" sx={{ mt: 2, mb: 1 }}>Trial: {trialIndexS + 1}/{xpConfig.numberOfTrials}</Typography >
                    <TrialTimerProgress />
                    <Grid container>
                        <Grid item xs={12}>
                            <Box sx={{ height: 64, my: 1 }}>
                                <MoneyOutcome xpData={xpData} xpConfig={xpConfig} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                        <Grid item xs={5}>
                            <PickBalloon xpData={xpData} xpConfig={xpConfig} />
                        </Grid>
                        {/* <Grid item xs={2} /> */}

                        <Grid item xs={7}>
                            <ValueChart xpData={xpData} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </Container>
    )
}

export default BalloonTrialPage