import balloon from '../../assets/balloon.png';
import { motion } from "framer-motion";
import styled from "styled-components";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showMoneyOutcome, recordMulResp, mulHistory, missHistory, trialIndex } from "../../slices/gameSlice";
import { Fragment } from 'react';

const shadow = 'brightness(120%) contrast(150%) drop-shadow(0px 0px 7px rgba(0,128,128,1.0)'
const BalloonImage = styled(motion.img)`
    display: block;
    margin: 8px auto;
    height: 120px;
    -webkit-filter: ${props => props.lastBalloon ? shadow : ''});
    filter: ${props => props.lastBalloon ? shadow : ''});
`
export default function BalloonScreen({ xpData, xpConfig }) {
    const dispatch = useDispatch();
    const showMoneyOutcomeS = useSelector(showMoneyOutcome);
    const mulHistoryS = useSelector(mulHistory);
    const missHistoryS = useSelector(missHistory);
    const trialIndexS = useSelector(trialIndex);
    const { costToSwitch } = xpConfig;

    const variants = {
        hover: {
            scale: 1.2,
            transition: {
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.5,
            }
        },
    }

    const clickedAction = (mul) => {
        dispatch(recordMulResp({ mul, missed: false }));
    }


    return (
        <>
            <Grid
                style={showMoneyOutcomeS ? { filter: "grayscale(100%)", pointerEvents: "none" } : {}}
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
            >
                {[2, 1, -1, -2].map((x, i) => {
                    return (
                        <Fragment key={i}>
                            <Grid item xs={6}>
                                <Typography variant={'h3'} align="center">
                                    <b>{x}</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Tooltip placement="right"
                                    title={(trialIndexS > 0 ? mulHistoryS[trialIndexS - 1] : 0) * x < 0 ? <h2>{'Changing screen costs $' + costToSwitch}</h2> : ""}
                                >
                                    <BalloonImage
                                        lastBalloon={showMoneyOutcomeS && mulHistoryS[trialIndexS] === x && !missHistoryS[trialIndexS]}
                                        variants={variants}
                                        whileHover="hover"
                                        src={balloon} alt="balloon"
                                        onClick={() => { clickedAction(x) }}
                                    />
                                </Tooltip>
                            </Grid>
                        </Fragment>
                    )
                })}
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <Box display={"flex"} justifyContent={"center"} sx={{ m: 3 }}>
                        <Button size="large" variant="contained" onClick={() => { clickedAction(0) }}                        >
                            Pass
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}