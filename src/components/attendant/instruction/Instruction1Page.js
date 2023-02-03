import { Container, Box, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import { useRef, useEffect } from "react";
import { loginAttendant } from "../../../slices/attendantSlice";
import { useDispatch, useSelector } from "react-redux";


const Instruction1Page = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { alias } = useParams();
    const loginAttendantS = useSelector(loginAttendant);

    return (
        <Container maxWidth="lg">
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">Welcome</Typography >
                   
                </Grid>
            </Grid >
        </Container>
    )
}

export default Instruction1Page