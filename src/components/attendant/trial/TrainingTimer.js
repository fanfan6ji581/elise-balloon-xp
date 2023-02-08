import { Container, Grid, Typography } from "@mui/material";
import Countdown from 'react-countdown';

const TrainingTimer = ({ trainingSessionSeconds, onFinish }) => {
    const zeroPad = (num, places) => String(num).padStart(places, '0')

    const renderer = ({ minutes, seconds, completed }) => {
        return <span>{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</span>;
    };

    return (
        <>
            {
                <Container maxWidth="lg" sx={{ mt: 3 }}>
                    <Grid container alignItems="center">
                        <Grid item xs={6}>
                            <Typography variant="body1" textAlign="right" sx={{ mr: 1 }}>
                                Training time left:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Countdown date={Date.now() + trainingSessionSeconds * 1000} renderer={renderer} onComplete={onFinish} />
                        </Grid>
                    </Grid>
                </Container>
            }
        </>

    )
}

export default TrainingTimer