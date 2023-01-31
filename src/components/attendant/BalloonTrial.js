import { Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import { useRef, useEffect } from "react";
import { loginAttendant } from "../../slices/attendantSlice";
import { trialIndex, timerProgress, showMoneyOutcome, incrementTimer, recordMulResp } from "../../slices/gameSlice";
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
        }, xpConfig.afkTimeout * 20);
    }

    useEffect(() => {
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
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sx={{ m: 2 }}>
                <br />
                <Typography variant="h4" align="center">Trial: {trialIndexS + 1}/{xpConfig.numberOfTrials}</Typography >
                <br />
                <TrialTimerProgress />
                <br />

                <PickBalloon xpData={xpData} xpConfig={xpConfig} />
                <MoneyOutcome xpData={xpData} xpConfig={xpConfig} />
                <ValueChart xpData={xpData} />
            </Grid>
        </Grid >
    )
}

export default BalloonTrialPage