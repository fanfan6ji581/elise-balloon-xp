import { useSelector } from "react-redux";
import { outcomeHistory } from "../../slices/gameSlice";
import { loginAttendant } from "../../slices/attendantSlice";
import { Container, Grid, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Winwheel } from "../winwheel/Winwheel";
import wheelConfig from "../winwheel/WheelConfig";

export default function PaymentScreen() {
    const outcomeHistoryS = useSelector(outcomeHistory);
    const loginAttendantS = useSelector(loginAttendant);
    const { xpConfig } = loginAttendantS;

    const moneyFromTrials = outcomeHistoryS.reduce((a, b) => a + b, 0);
    const earnings = moneyFromTrials - xpConfig.thresholdValue;

    const [spinning, setSpinning] = useState(false);
    const [wheelEarnings, setWheelEarnings] = useState(0);
    const winwheel = useRef(null);

    const alertPrize = (segment) => {
        setWheelEarnings(segment.value);
    }

    useEffect(() => {
        winwheel.current = new Winwheel(wheelConfig(alertPrize, 0), true);
    }, [])

    return (
        <Container maxWidth="md">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" align="center" sx={{ m: 5 }}>Game over!</Typography>

                    {(earnings <= 0 && wheelEarnings <= 0) &&
                        <>
                            <Typography variant="body1" sx={{ m: 2 }}> Your net accumulated outcomes in the task are -${-earnings}</Typography>
                            <Typography variant="body1" sx={{ m: 2 }}> Sorry! However, to thank you for your participation in this research project,
                                we wish to invite you to participate in a wheel of fortune lottery in which you can only win money</Typography>

                            <div className="the_wheel">
                                <canvas id="canvas" height={434} width={434} className="the_canvas">
                                    <p style={{ color: 'white' }} align="center">Sorry, your browser doesn't support canvas. Please try another.</p>
                                </canvas>
                            </div>

                            <Button variant="contained" disabled={spinning} sx={{ m: 2 }} onClick={() => {
                                winwheel.current.startAnimation()
                                setSpinning(true)
                            }}>Spin</Button>
                        </>
                    }

                    {(earnings <= 0 && wheelEarnings > 0) &&
                        <>
                            <Typography variant="body1" sx={{ m: 2 }}>
                                Lucky you, you’ve just won ${wheelEarnings} at the wheel of fortune! Your net final outcomes in the experiment are thus ${wheelEarnings}.
                            </Typography>
                            <Typography variant="body1" sx={{ m: 2 }}>
                                Note that you will further receive $5 (the show-up reward), and your earnings at the pre-game test.
                            </Typography>
                            <Typography variant="body1" sx={{ m: 2 }}>
                                Thanks again for your participation! The experimenter is going to proceed to the payment procedure very soon, thanks for your patience.
                            </Typography>
                        </>
                    }

                    {earnings > 0 &&
                        <>
                            <Typography variant="body1" sx={{ m: 2 }}>
                                Your net accumulated outcomes in the task are <b>${moneyFromTrials}</b>, the threshold of task is <b>${xpConfig.thresholdValue}</b>, so your earnings are ${earnings}.
                            </Typography>
                            <Typography variant="body1" sx={{ m: 2 }}>
                                Congratulations! The experimenter is going to proceed to the payment procedure very soon, thanks for your patience.
                            </Typography>
                        </>
                    }

                </Grid>
            </Grid>
        </Container>
    )
}