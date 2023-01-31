import { getDocs, collection, query, where } from "firebase/firestore";
import db from "../../database/firebase";
import { useEffect, useState } from "react";
import { Container, Grid, Typography, Alert, TextField } from "@mui/material";
import { Link, useParams } from 'react-router-dom';


const Attendents = () => {
    const [attedent, setAttendent] = useState([]);
    const [xp, setXp] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const { alias, username } = useParams()

    const fetchXP = async () => {
        const snapshot = await getDocs(query(collection(db, "xp"), where("alias", "==", alias)));
        const xps = snapshot.docs.map(d => (Object.assign({ id: d.id }, d.data())));
        if (xps.length === 1) {
            setXp(xps[0]);
        } else {
            setErrorMsg(`Cannot find such XP with alias "${alias}"`)
        }
    };

    const fetchAttendant = async () => {
        const snapshot = await getDocs(query(collection(db, "attendant"),
            where("xp_alias", "==", alias),
            where("username", "==", username),
        ));

        const attendants = snapshot.docs.map(d => (Object.assign({ id: d.id }, d.data())));
        if (attendants.length === 1) {
            setAttendent(attendants[0]);
        } else {
            setErrorMsg("Could not find this attendent")
        }
    };


    useEffect(() => {
        fetchAttendant();
        fetchXP();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Attedent <b>{username}</b> for <Link to={`/admin/xp/${alias}`}>Experiment {alias}</Link></Typography >

                        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

                        <br />
                        {xp && attedent && <>
                            <TextField variant="standard" fullWidth sx={{ my: 2 }}
                                label="Number of abberations"
                                defaultValue={`${attedent.xpData._numAbberations} / ${attedent.xpData.balloonValues.length} = ${attedent.xpData._numAbberations / xp.numberOfTrials}`}
                                InputProps={{ readOnly: true }} />
                            <TextField variant="standard" fullWidth sx={{ my: 2 }}
                                label="Times entered Dangerzone"
                                defaultValue={`${attedent.xpData._numDangerzone} / ${attedent.xpData.balloonValues.length} = ${attedent.xpData._numDangerzone / xp.numberOfTrials}`}
                                InputProps={{ readOnly: true }} />
                            <TextField variant="standard" fullWidth sx={{ my: 2 }}
                                label="Trial n Dangerzone reset"
                                defaultValue={JSON.stringify(attedent.xpData._dangerZoneSpeedReset)}
                                InputProps={{ readOnly: true }} />
                            <TextField variant="standard" fullWidth sx={{ my: 2 }}
                                label="Trial n Dangerzone reset % chance"
                                defaultValue={JSON.stringify(attedent.xpData.chances)}
                                InputProps={{ readOnly: true }} />
                            <TextField variant="standard" fullWidth sx={{ my: 2 }}
                                label="Trial n Dangerzone reset expected"
                                defaultValue={JSON.stringify(attedent.xpData._dangerZoneResetCalc)}
                                InputProps={{ readOnly: true }} />
                            <TextField variant="standard" fullWidth sx={{ my: 2 }} multiline rows={6}
                                label="Ballon Values"
                                defaultValue={JSON.stringify(attedent.xpData.balloonValues)}
                                InputProps={{ readOnly: true }} />
                            <TextField variant="standard" fullWidth sx={{ my: 2 }} multiline rows={6}
                                label="Ballon Speed"
                                defaultValue={JSON.stringify(attedent.xpData.balloonSpeed)}
                                InputProps={{ readOnly: true }} />
                        </>}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Attendents