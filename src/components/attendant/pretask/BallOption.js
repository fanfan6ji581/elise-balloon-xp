import { React, useState } from "react";
import { Box, Typography } from '@mui/material';
import BallOptionChart from "./BallOptionChart"
import { Global, css } from '@emotion/react'


export default function BallOption({ type, winQty, lossQty, winCash, lossCash, label }) {
    const [active, setActive] = useState(false)

    const onClick = () => {
        setActive(!active);
    }

    return <>
        <Global
            styles={css`
                .card {
                    background-color: #fff
                }
                .card:hover {
                    background-color: rgba(229, 228, 226, 0.4)
                }
                .card.cardactive {
                    background-color: rgba(100, 149, 237, 0.25)
                }
            `}
        />

        <Box sx={{ p: 1, }}>
            <Box className={`card ${active ? 'cardactive' : ''}`} onClick={() => onClick()}>
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
    </>
}
