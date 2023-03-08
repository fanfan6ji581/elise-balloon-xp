import { React, useState } from "react";
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import BallOptionChartSkip from "./BallOptionChartSkip"

const useStyles = makeStyles({
    card: {
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: 'rgba(229, 228, 226, 0.4)',
        },
    },
    cardactive: {
        backgroundColor: 'rgba(100, 149, 237, 0.3)!important',
    }
})

export default function BallOptionSkip() {
    const classes = useStyles()
    const [active, setActive] = useState(false)

    const onClick = () => {
        setActive(!active);
    }

    return <Box sx={{ p: 1, }}>
        <Box className={`${classes.card} ${active ? classes.cardactive : ''}`} onClick={() => onClick()}>
            <BallOptionChartSkip />
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4">Skip</Typography>
            </Box>
        </Box>
    </Box>
}
