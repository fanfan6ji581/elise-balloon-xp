import { React, useState } from "react";
import { Box, Typography } from '@mui/material';
import BallOptionChartSkip from "./BallOptionChartSkip"

export default function BallOptionSkip() {
    const [active, setActive] = useState(false)

    const onClick = () => {
        setActive(!active);
    }

    return <Box sx={{ p: 1, }}>
        <Box className={`card ${active ? 'cardactive' : ''}`} onClick={() => onClick()}>
            <BallOptionChartSkip />
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4">Skip</Typography>
            </Box>
        </Box>
    </Box>
}
