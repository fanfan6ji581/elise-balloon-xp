import Form from '@rjsf/mui';
import validator from "@rjsf/validator-ajv8";
import { Container, Grid, Alert, Typography, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import db from "../../database/firebase";

const schema = {
    // "title": "Configure random system",
    "description": "",
    "type": "object",
    "required": [
        "dangerZoneChance",
        "aberrationChance",
        "costToSwitch"
    ],
    "properties": {
        "dangerZoneChance": {
            "type": "string",
            "title": "prob_dangerous Probability that speed departs from threshold value (i.e., we enter the “dangerous zone preceding a regime shift)",
            // "default": "1/6"
        },
        "lambda": {
            "type": "string",
            "title": "λ intensity",
            // "default": "1/3"
        },
        "aberrationChance": {
            "type": "string",
            "title": "prob_aberration Probability of occurrence of an aberration",
            // "default": "1/6"
        },
        "delta": {
            "type": "integer",
            "title": "∆ change_speed",
            // "default": 100
        },
        "costToSwitch": {
            "type": "integer",
            "title": "Cost to switch the other screen",
            // "default": 6
        },
        "outcomeShowTime": {
            "type": "integer",
            "title": "Outcome stage",
            // "default": 2
        },
        "afkTimeout": {
            "type": "integer",
            "title": "Decision stage",
            // "default": 2
        },
        "afkTimeoutCost": {
            "type": "integer",
            "title": "Cost if missed trial",
            // "default": 1
        },
        "numberOfTrials": {
            "type": "integer",
            "title": "Number of trials T",
            // "default": 400
        },
        "thresholdValue": {
            "type": "integer",
            "title": "Threshold value for payment rule",
            // "default": 100
        }
    }
};

const uiSchema = {
    "ui:options": {
        "submitButtonOptions": {
            "props": {
                "className": "btn btn-info",
            },
            "norender": false,
            "submitText": "Save"
        }
    }
}

const ExperimentConfig = () => {
    const dispatch = useDispatch();
    const [tab, setTab] = useState('1');
    const [xp, setXp] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const { alias } = useParams()

    const onChangeTab = (event, newValue) => {
        setTab(newValue);
    };

    const fetchXP = async () => {
        const snapshot = await getDocs(query(collection(db, "xp"), where("alias", "==", alias)));
        const xps = snapshot.docs.map(d => (Object.assign({ id: d.id }, d.data())));
        if (xps.length == 1) {
            setXp(xps[0]);
        } else {
            setErrorMsg(`Cannot find such XP with alias "${alias}"`)
        }
    };

    const onSaveConfig = async ({ formData }, e) => {
        e.preventDefault();
        const xpDocRef = doc(db, "xp", formData.id);
        await updateDoc(xpDocRef, formData);
        setXp(formData);
        window.alert("XP config has been saved successfully");
    };

    useEffect(() => {
        fetchXP();
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
                                    <Form schema={schema} uiSchema={uiSchema} formData={xp} onSubmit={onSaveConfig} validator={validator} />
                                </TabPanel>
                                <TabPanel value="2">to be build</TabPanel>
                            </TabContext>
                        </Box>
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default ExperimentConfig