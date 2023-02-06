import { Container, Box, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom"
import { loginAttendant } from "../../../slices/attendantSlice";
import { useSelector } from "react-redux";

const Instruction4Page = () => {
    const { alias } = useParams();
    const loginAttendantS = useSelector(loginAttendant);
    const { xpConfig } = loginAttendantS;


    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" sx={{ my: 5 }}>
                Ready to Play?
            </Typography>

            <Typography variant="h6" align="center" sx={{ my: 5 }}>
                Remember that if you play well, you have fair chances to win the maximal amount ($150). However, the game is hard, and its pace is quick: you have only {xpConfig.afkTimeout / 1000} seconds to make your decision on each trial. If you do not reply within the imparted time,
                you lose ${xpConfig.afkTimeoutCost} and move to the next trial. Have a short training session to learn how to play the game!
            </Typography>

            <Box textAlign="center" sx={{ my: 10 }}>
                <Button component={Link} variant="contained" size="large"
                    sx={{ width: 240, padding: 3 }}
                    to={`/xp/${alias}/training`}>GO TO TRAINING</Button>
            </Box>
            <Box textAlign="center" sx={{ my: 10 }}>
                <Button color="warning" component={Link} variant="contained" size="large"
                    sx={{ width: 240, padding: 3 }}
                    to={`/xp/${alias}/skip-training`}>SKIP TRAINING</Button>
            </Box>
        </Container >
    )
}

export default Instruction4Page