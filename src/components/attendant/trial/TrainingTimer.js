import { Container, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Countdown from 'react-countdown';

const TrainingTimer = () => {
    const { alias } = useParams()
    const navigate = useNavigate();
    const zeroPad = (num, places) => String(num).padStart(places, '0')

    const renderer = ({ minutes, seconds, completed }) => {
        return <span>{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</span>;
    };

    const onComplete = () => {
        navigate(`/xp/${alias}/quiz`);
    }

    return (
        <>
            {
                <Container maxWidth="lg" sx={{ mt: 3 }}>
                    <Grid container alignItems="center">
                        <Grid item xs={6}>
                            <Typography variant="body1" textAlign="right">
                                Training time left:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Countdown date={Date.now() + 5 * 60 * 1000} renderer={renderer} onComplete={onComplete} />
                        </Grid>
                    </Grid>
                </Container>
            }
        </>

    )
}

export default TrainingTimer