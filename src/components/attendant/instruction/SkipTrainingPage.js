import {
    Container, Typography
} from "@mui/material";
// import { useParams } from "react-router-dom"
// import { loginAttendant } from "../../../slices/attendantSlice";
// import { useSelector } from "react-redux";

const SkipTraining = () => {
    // const { alias } = useParams();
    // const loginAttendantS = useSelector(loginAttendant);

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" align="center" sx={{ my: 3 }}>
                Please wait, the experimenter will come shortly
            </Typography>

        </Container >
    )
}

export default SkipTraining