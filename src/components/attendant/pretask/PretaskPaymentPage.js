import { useSelector } from "react-redux";
import { Container, Grid, Typography, Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { loginAttendant } from "../../../slices/attendantSlice";
import { getAttendant } from "../../../database/attendant";

export default function PretaskPaymentPage() {
    const loginAttendantS = useSelector(loginAttendant);
    const [earning, setEarning] = useState("...");
    const [loadingOpen, setLoadingOpen] = useState(true);

    const calculateFinalOutcomes = async () => {
        const attendant = await getAttendant(loginAttendantS.id);
        let { pretaskRecord } = attendant;

        if (pretaskRecord) {
            setEarning(pretaskRecord.moneyOutcomeHistory.reduce((a, b) => a + b, 0))
        }

        setLoadingOpen(false);
    }

    useEffect(() => {
        calculateFinalOutcomes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingOpen} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container maxWidth="md">
                <Grid container justifyContent="center">
                    <Grid item xs={1} />
                    <Grid item xs={8} sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" align="center" sx={{ my: 5 }}>
                            Game over!
                        </Typography>

                        <Typography variant="body1" sx={{ my: 5 }}>
                            The game is over.
                        </Typography>

                        <Typography variant="body1" sx={{ my: 5 }}>
                            Your earnings are <b>${earning}</b>. Please wait, the experimenter will come shortly.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}