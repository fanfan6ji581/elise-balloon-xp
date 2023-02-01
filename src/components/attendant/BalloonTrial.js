import { Container, Box, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import { useRef, useEffect } from "react";
import { loginAttendant } from "../../slices/attendantSlice";
import { trialIndex, timerProgress, showMoneyOutcome, incrementTimer, recordMulResp, onLogin } from "../../slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import TrialTimerProgress from "./TrialTimerProgress";
import PickBalloon from "./PickBalloon";
import MoneyOutcome from "./MoneyOutcome";
import ValueChart from "./ValueChart";

const BalloonTrialPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { alias } = useParams();
    const timerInterval = useRef(null);
    const loginAttendantS = useSelector(loginAttendant);
    const trialIndexS = useSelector(trialIndex);
    const showMoneyOutcomeS = useSelector(showMoneyOutcome);
    const timerProgressS = useSelector(timerProgress);
    const { xpData, xpConfig } = loginAttendantS;

    const restartGameTimer = () => {
        clearInterval(timerInterval.current);
        timerInterval.current = setInterval(() => {
            dispatch(incrementTimer(0.5));
        }, xpConfig.afkTimeout * 5);
    }

    useEffect(() => {
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
        if (showMoneyOutcomeS) {
            clearInterval(timerInterval.current);
        } else {
            restartGameTimer()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showMoneyOutcomeS])

    useEffect(() => {
        if (trialIndexS === xpConfig.numberOfTrials) {
            console.log(`Game over`);
            navigate(`/xp/${alias}/payment`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trialIndexS])

    return (
        <Container maxWidth="lg">
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h5" align="center" sx={{ mt: 2, mb: 1 }}>Trial: {trialIndexS + 1}/{xpConfig.numberOfTrials}</Typography >
                    <TrialTimerProgress/>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box sx={{ height: 64, my: 1 }}>
                                <MoneyOutcome xpData={xpData} xpConfig={xpConfig} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ m: 1 }} alignItems="center">
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