import {
    Container, Typography
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const SkipTraining = () => {
    const { alias } = useParams();
    const navigate = useNavigate();

    const onKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'n') {
            navigate(`/xp/${alias}/quiz`);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown, false);
        return () => document.removeEventListener("keydown", onKeyDown, false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" align="center" sx={{ my: 3 }}>
                Please wait, the experimenter will come shortly
            </Typography>

        </Container >
    )
}

export default SkipTraining