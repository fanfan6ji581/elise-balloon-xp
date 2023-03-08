import { React, useState } from "react";
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import BallOptionChart from "./BallOptionChart"

const useStyles = makeStyles({
    card: {
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: 'rgba(229, 228, 226, 0.4)',
        },
    },
    cardactive: {
        backgroundColor: 'rgba(100, 149, 237, 0.25)!important',
    }
})

export default function BallOption({ type, winQty, lossQty, winCash, lossCash, label }) {
    const classes = useStyles()
    const [active, setActive] = useState(false)

    const onClick = () => {
        setActive(!active);
    }

    return <Box sx={{ p: 1, }}>
        <Box className={`${classes.card} ${active ? classes.cardactive : ''}`} onClick={() => onClick()}>
            <BallOptionChart
                type={type}
                winQty={winQty}
                lossQty={lossQty}
                winCash={winCash}
                lossCash={lossCash}
            />

            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4">{label}</Typography>
            </Box>
        </Box>
    </Box>
}
