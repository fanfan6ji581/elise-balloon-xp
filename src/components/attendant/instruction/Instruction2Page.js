import {
    Container, Box, Grid, Typography, Button,
    Alert, AlertTitle, Divider
} from "@mui/material";
import { Link, useParams } from "react-router-dom"
import { loginAttendant } from "../../../slices/attendantSlice";
import { useSelector } from "react-redux";
import YouTube from 'react-youtube';

const Instruction2Page = () => {
    const { alias } = useParams();
    const loginAttendantS = useSelector(loginAttendant);
    const { xpConfig } = loginAttendantS;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" sx={{ my: 5 }}>
                Here is a short demo that summarises the essentials of the game for you.
            </Typography>

            <Grid container alignItems="center" sx={{ my: 5 }}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <YouTube videoId={xpConfig.youtubeVideoId2} opts={{ width: '100%', height: 500 }} />
                </Grid>
            </Grid>

            <Divider />

            <Typography variant="h4" align="center" sx={{ mt: 10 }}>
                <b>Your Earnings from the Game</b>
            </Typography>

            <Typography variant="h6" sx={{ my: 10 }}>
                The computer randomly selects {xpConfig.percentageEarning}% of the trials you played and computes your accumulated wins and losses in these trials. You leave the lab with that amount (capped at $150 — the maximal amount you can get), plus the show-up reward of $5 (provided to you irrespective of your performance in the game). If the amount is negative, you end up with the show-up reward only.
            </Typography>

            <Alert icon={false} severity="warning">
                <AlertTitle sx={{ textAlign: 'center', fontSize: 32 }}>Important Note</AlertTitle>
                <Typography variant="h6">
                    Contrary to that in other experiments run in this lab, your earnings in this experiment will be highly contingent on how well you play the game: if you play well you can earn up to $150. But if you don’t perform well, you can also end up with nothing but the show-up reward of $5.
                </Typography>
            </Alert>

            <Box textAlign="center" sx={{ my: 10 }}>
                <Button component={Link} variant="contained" size="large" to={`/xp/${alias}/instruction3`}>Next</Button>
            </Box>
        </Container >
    )
}

export default Instruction2Page