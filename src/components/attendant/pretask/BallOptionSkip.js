import { React } from "react";
import { Box, Typography } from '@mui/material';
import { betSkip, updateBet, } from "../../../slices/pretaskSlice";
import { useDispatch, useSelector } from "react-redux";

export default function BallOptionSkip() {
    const dispatch = useDispatch();
    const betSkipS = useSelector(betSkip);

    const onClick = () => {
        // setActive(!active);
        dispatch(updateBet({ type: "skip", value: !betSkipS }));
    }

    return <Box sx={{ p: 1, }}>
        <Box className={`card ${betSkipS ? 'cardactive' : ''}`}
            style={{
                padding: '24px 0',
            }}
            onClick={() => onClick()}>
            <div style={{
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: '#A9A9A9',
                margin: '0 auto',
                padding: '135px 0',
                textAlign: 'center',
                fontSize: 20,
                color: 'white'
            }}>get $0 with certainty</div>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="h5">Skip</Typography>
            </Box>
        </Box>
    </Box>
}
