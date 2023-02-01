import { useEffect, useState } from "react";
import { Container, Grid, Typography, IconButton, Divider } from "@mui/material";
import { Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { collection, getDocs, deleteDoc, doc, addDoc, query, where, writeBatch } from "firebase/firestore";
import db from "../../database/firebase";
import { DataGrid } from '@mui/x-data-grid';
import Form from '@rjsf/mui';
import validator from "@rjsf/validator-ajv8";
import moment from "moment";
import { Link } from "react-router-dom";

const DashboardPage = () => {
    const [xps, setXps] = useState([]);

    const columns = [
        { field: 'alias', headerName: 'Aalias', width: 400 },
        {
            field: 'created', headerName: 'Created', width: 200,
            valueFormatter: params => moment(params?.value).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            field: 'action', headerName: 'Actions', width: 200,
            sortable: false,
            renderCell: (params) => {
                const onDelete = async (e) => {
                    e.stopPropagation();
                    const data = params.row;
                    if (!window.confirm(`Are you sure to delete "${data.alias}"?`)) {
                        return;
                    }
                    // delete attdents
                    const snapshot = await getDocs(query(collection(db, "attendant"), where("xp_alias", "==", data.alias)));
                    const batch = writeBatch(db);
                    snapshot.docs.forEach((document) => {
                        batch.delete(document.ref);
                    });
                    await batch.commit();

                    // delete xp
                    const xpDocRef = doc(db, "xp", data.id)
                    await deleteDoc(xpDocRef);
                    setXps(xps.filter(xp => xp.id !== data.id))
                }
                return (
                    <>
                        <IconButton component={Link} to={`/admin/xp/${params.row.alias}`}><VisibilityIcon /></IconButton>
                        <IconButton onClick={onDelete}><DeleteIcon /></IconButton>
                    </>
                )
            },
        },
    ];

    const schema = {
        "type": "object",
        "properties": {
            "alias": {
                "type": "string",
            },
        },
        required: [
            "alias",
        ]
    };

    const fetchXPs = async () => {
        const snapshot = await getDocs(collection(db, "xp"));
        setXps(snapshot.docs.map(d => (Object.assign({ id: d.id }, d.data()))));
    };

    const onAddXp = async ({ formData }, e) => {
        e.preventDefault();

        // validate if there are any exsiting same alias
        if (xps.find(xp => xp.alias === formData.alias)) {
            window.alert("Duplicate alias, please rename it");
            return;
        }

        const xp = {
            alias: formData.alias,
            created: Date.now(),
            // following are default value
            dangerZoneChance: "1/6",
            lambda: "1/3",
            aberrationChance: "1/12",
            delta: 100,
            costToSwitch: 1,
            choiceDelay: 0,
            outcomeShowTime: 2,
            afkTimeout: 2,
            afkTimeoutCost: 1,
            numberOfTrials: 400,
            thresholdValue: 100
        };
        const resp = await addDoc(collection(db, "xp"), xp);
        xp.id = resp.id;
        setXps([...xps, xp]);
    };


    useEffect(() => {
        fetchXPs();
    }, [])

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h4'>Dashboard</Typography >
                </Grid>
                <Grid item xs={9}>
                    <DataGrid autoHeight rows={xps} columns={columns}
                        initialState={{
                            sorting:
                            {
                                sortModel: [{
                                    field: 'created', sort: 'desc'
                                }]
                            }
                        }} />
                </Grid>
                <Divider flexItem={true} />
                <Grid item xs={3}>
                    <Typography variant='h6'>Add new XP</Typography>
                    <Form schema={schema} onSubmit={onAddXp} validator={validator} />
                </Grid>
            </Grid>
        </Container >
    )
}

export default DashboardPage