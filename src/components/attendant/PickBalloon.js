import balloon from '../../assets/balloon.png';
import { motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showMoneyOutcome, recordMulResp, mulHistory, trialIndex } from "../../slices/gameSlice";
import { Fragment } from 'react';

const initialValue = 480;
const shadow = 'brightness(120%) contrast(150%) drop-shadow(0px 0px 7px rgba(0,128,128,1.0)'
const BalloonImage = styled(motion.img)`
    border-radius: 3px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: ${initialValue / 5 + 'px'};
    margin-botton: ${initialValue / 84 + 'px'};
    margin-top: ${initialValue / 84 + 'px'};
    -webkit-filter: ${props => props.lastBalloon ? shadow : ''});
    filter: ${props => props.lastBalloon ? shadow : ''});
`

export default function BalloonScreen({ xpData, xpConfig }) {
    const dispatch = useDispatch();
    const showMoneyOutcomeS = useSelector(showMoneyOutcome);
    const mulHistoryS = useSelector(mulHistory);
    const trialIndexS = useSelector(trialIndex);
    const [mul, setMul] = useState(0);
    const { costToSwitch } = xpConfig;
    const lastMultiplier = trialIndexS > 0 ? mulHistoryS[trialIndexS - 1] : 0;

    const variants = {
        hover: {
            scale: 1.2,
            transition: {
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.6,
            }
        },
    }

    const clickedAction = (mul) => {
        setMul(mul);
        dispatch(recordMulResp({ mul, missed: false }));
    }

    return (
        <>
            <Grid
                style={showMoneyOutcomeS ? { filter: "grayscale(100%)", pointerEvents: "none" } : {}}
                container
                direction="row"
                alignItems="center"
            >
                {[2, 1, -1, -2].map((x, i) => {
                    return (
                        <Fragment key={i}>
                            <Grid item xs={6}>
                                <Typography variant={'h4'} align="right">
                                    <b>{x}  &mdash;</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Tooltip placement="right"
                                    title={lastMultiplier * x < 0 ? <h2>{'Changing screen costs $' + costToSwitch}</h2> : ""}
                                >
                                    <BalloonImage
                                        lastBalloon={showMoneyOutcomeS && mul === x}
                                        variants={variants}
                                        whileHover="hover"
                                        animate={{
                                            y: Math.random() * 5,
                                            x: Math.random() * 5,
                                            transition: {
                                                repeat: Infinity,
                                                repeatType: 'reverse',
                                                duration: 3 * Math.random() + 1
                                            }
                                        }}
                                        src={balloon} alt="balloon"
                                        onClick={() => { clickedAction(x) }}
                                    />
                                </Tooltip>
                            </Grid>
                        </Fragment>
                    )
                })}
                <Grid item xs={12}>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                    >
                        <Button variant="contained" onClick={() => { clickedAction(0) }}                        >
                            Pass
                        </Button>

                    </Box>
                </Grid>
            </Grid>
        </>
    )
}