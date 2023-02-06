import TrainingTimer from './TrainingTimer';
import BalloonTrial from './BalloonTrial';
import { loginAttendant } from "../../../slices/attendantSlice";
import { reset, nextTrial } from "../../../slices/gameSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const BalloonTrialTrainingPage = () => {
    const { alias } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginAttendantS = useSelector(loginAttendant);
    const { xpConfig } = loginAttendantS;
    const { trainingSessionSeconds } = xpConfig;

    const onKeyDown = (e) => {
        if (e.key === ' ') {
            navigate(`/xp/${alias}/instruction3`);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown, false);
        dispatch(reset());
        dispatch(nextTrial());

        return () => {
            document.removeEventListener("keydown", onKeyDown, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <BalloonTrial isTrainingMode={true} />
            <TrainingTimer trainingSessionSeconds={trainingSessionSeconds} />
        </>
    )
}

export default BalloonTrialTrainingPage