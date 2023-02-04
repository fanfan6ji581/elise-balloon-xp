import { Container, Box, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom"
import { loginAttendant } from "../../../slices/attendantSlice";
import { useSelector } from "react-redux";

const Instruction3Page = () => {
    const { alias } = useParams();
    const loginAttendantS = useSelector(loginAttendant);
    const { xpConfig } = loginAttendantS;


    return (
        <Container maxWidth="lg">
            <Typography variant="h5" align="center" sx={{ my: 3 }}>
                Ready to Play?
            </Typography>

            <Typography variant="body1" align="center" sx={{ my: 3 }}>
                Remember that if you play well, you have fair chances to win the maximal amount ($150). However, the game is hard, and its pace is quick: you have only {xpConfig.afkTimeout / 1000} seconds to make your decision on each trial. If you do not reply within the imparted time,
                you lose ${xpConfig.afkTimeoutCost} and move to the next trial. Have a short training session to learn how to play the game!
            </Typography>

            <Box textAlign="center" sx={{ my: 3 }}>
                <Button component={Link} variant="contained" size="large" to={`/xp/${alias}/instruction3`}>GO TO TRAINING</Button>
            </Box>
            <Box textAlign="center" sx={{ my: 3 }}>
                <Button color="warning" component={Link} variant="contained" size="large" to={`/xp/${alias}/skip-training`}>SKIP TRAINING</Button>
            </Box>
        </Container >
    )
}

export default Instruction3Page