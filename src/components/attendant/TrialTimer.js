import {LinearProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {timerProgress, trials} from "../../slices/gameDataSlice";

export function TrialTimer() {
    const progress = useSelector(timerProgress);

    return (
        <>
            {/*<LinearProgress className={progress === 0 ? 'instant' : ''} variant={'determinate'} value={progress}/>*/}
            <LinearProgress className='instant' style={{width:'100%'}} variant={'determinate'} value={progress} color={progress >= 55 ? 'secondary':'primary'}/>
        </>
    )
}