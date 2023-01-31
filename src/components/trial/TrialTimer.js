import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { timerProgress } from "../../slices/gameDataSlice";

export default function TrialTimer() {
    const progress = useSelector(timerProgress);

    return (
        <LinearProgress className='instant' style={{ width: '100%' }} variant={'determinate'} value={progress} color={progress >= 55 ? 'secondary' : 'primary'} />
    )
}