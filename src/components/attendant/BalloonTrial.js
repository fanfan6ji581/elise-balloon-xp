import Form from '@rjsf/mui';
import validator from "@rjsf/validator-ajv8";
import { Grid, Alert, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { Link, useParams } from 'react-router-dom';
import db from "../../database/firebase";
import { loginAttendant } from "../../slices/attendantSlice";
import { useDispatch, useSelector } from "react-redux";

const BalloonTrialPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const loginAttendantS = useSelector(loginAttendant);

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Typography variant="h3">Trial page</Typography >
                {JSON.stringify(loginAttendantS.xpData)}
            </Grid>
        </Grid>
    )
}

export default BalloonTrialPage