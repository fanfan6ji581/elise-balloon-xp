import { BalloonScreen } from "./BalloonScreen";
import { ValueChart } from "./ValueChart";
import styled from "styled-components";
import { Button, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { gameOver, resetGame, trials } from "../../slices/gameDataSlice";
import TrialTimer from "./TrialTimer";
import { numberOfTrials } from "../../slices/gameSettingSlice";
import { PaymentScreen } from "./PaymentScreen";
import { useEffect } from "react";
import { Winwheel } from "../winwheel/Winwheel";
import wheelConfig from "../winwheel/WheelConfig";

const Container2 = styled.div`
    background-image: linear-gradient(#eee, #fff);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export function TrialPage() {
    const dispatch = useDispatch()
    const trialNumber = useSelector(trials);
    const maxTrialNumber = useSelector(numberOfTrials);
    const gameOverr = useSelector(gameOver);
    const gameSettings = useSelector(state => state.gameSetting)
    useEffect(() => {
        if (trialNumber >= maxTrialNumber) {
            new Winwheel(wheelConfig(69), true);
        }
    })

    return (
        <>
            {!gameOverr &&
                <Stack
                    height={"100%"}
                    margin={3}
                    alignItems={"center"}
                >
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            dispatch(resetGame(gameSettings))
                        }}
                    >Reset</Button>
                    <h2>Trial: {trialNumber}/{maxTrialNumber}</h2>
                    <TrialTimer />

                    <Grid
                        height={"100%"}
                        direction={"row"}
                        container
                    >
                        <Grid item xs={5}>
                            <BalloonScreen />
                        </Grid>
                        <Grid item xs={7}>
                            <ValueChart />
                        </Grid>
                    </Grid>
                </Stack>
            }

            {gameOverr &&
                <Container2>
                    <PaymentScreen />
                </Container2>
            }
        </>
    );
}