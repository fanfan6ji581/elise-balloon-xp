import {
    Container, Box, Grid, Typography, Button,
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


            <Box textAlign="center" sx={{ my: 10 }}>
                <Button component={Link} variant="contained" size="large" to={`/xp/${alias}/instruction3`}>Next</Button>
            </Box>
        </Container >
    )
}

export default Instruction2Page