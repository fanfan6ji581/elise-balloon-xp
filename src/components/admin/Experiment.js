import { Container, Grid, Alert, Typography, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../database/firebase";
import ExperimentConfig from './ExperimentConfig';
import Attedents from './Attedents';

const Experiment = () => {
    const [tab, setTab] = useState('2');
    const [xp, setXp] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const { alias } = useParams()

    const onChangeTab = (e, newValue) => {
        setTab(newValue);
    };

    const fetchXP = async () => {
        const snapshot = await getDocs(query(collection(db, "xp"), where("alias", "==", alias)));
        const xps = snapshot.docs.map(d => (Object.assign({ id: d.id }, d.data())));
        if (xps.length === 1) {
            setXp(xps[0]);
        } else {
            setErrorMsg(`Cannot find such XP with alias "${alias}"`)
        }
    };

    useEffect(() => {
        fetchXP();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h4'>Experiment <b>{alias}</b></Typography >
                    {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                    {xp &&
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={tab}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={onChangeTab} aria-label="lab API tabs example">
                                        <Tab label="Config" value="1" />
                                        <Tab label="Attendants" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <ExperimentConfig xp={xp} setXp={setXp} />
                                </TabPanel>
                                <TabPanel value="2">
                                    <Attedents xp={xp} />
                                </TabPanel>
                            </TabContext>
                        </Box>
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default Experiment