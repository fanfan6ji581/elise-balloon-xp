import Form from '@rjsf/mui';
import validator from "@rjsf/validator-ajv8";
import { getDocs, doc, writeBatch, collection, query, where } from "firebase/firestore";
import db from "../../database/firebase";
import { useEffect, useState } from "react";
import { Grid, Typography, IconButton, Button } from "@mui/material";
import { Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

const zeroPad = (num, places) => String(num).padStart(places, '0')

const schema = {
    "type": "object",
    "properties": {
        "count": {
            "type": "number",
            "title": "Number of attendants to generate",
            "default": 5,
        },
    },
    required: [
        "count",
    ]
};

const Attendents = ({ xp, setXp }) => {
    const [attedents, setAttendents] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);

    const columns = [
        { field: 'username', headerName: 'Username', width: 150 },
        { field: 'password', headerName: 'Password', width: 150 },
        {
            field: 'created', headerName: 'Created', width: 200,
            valueFormatter: params => moment(params?.value).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            field: 'action', headerName: 'Actions', width: 200,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton><VisibilityIcon /></IconButton>
                    </>
                )
            },
        },
    ];

    const fetchAttendants = async () => {
        const snapshot = await getDocs(query(collection(db, "attendant"), where("xp_alias", "==", xp.alias)));
        const attendants = snapshot.docs.map(d => (Object.assign({ id: d.id }, d.data())));
        setAttendents(attendants);
    };

    const onCreateAttendents = async ({ formData }, e) => {
        e.preventDefault();
        if (formData.count <= 0) {
            return;
        }

        const batch = writeBatch(db);
        for (let i = 0; i < formData.count; i++) {
            const attendant = {
                username: `guest${zeroPad(attedents.length + i + 1, 2)}`,
                password: Math.random().toString(36).slice(-6),
                created: Date.now(),
                xp_alias: xp.alias,
                xp_id: xp.id,
            }
            const ref = doc(collection(db, "attendant"));
            batch.set(ref, attendant);
        }
        await batch.commit();
        await fetchAttendants();
    };

    const onDeleteAttdendants = async (e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure to delete?")) {
            return;
        }

        const batch = writeBatch(db);
        for (let i = 0; i < selectionModel.length; i++) {
            const ref = doc(db, "attendant", selectionModel[i]);
            batch.delete(ref);
        }
        await batch.commit();
        await fetchAttendants();
    };

    useEffect(() => {
        fetchAttendants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <DataGrid autoHeight rows={attedents} columns={columns}
                        checkboxSelection
                        onSelectionModelChange={m => setSelectionModel(m)}
                        sx={{ mb: 3 }}
                        initialState={{
                            sorting:
                            {
                                sortModel: [{
                                    field: 'username'
                                }]
                            }
                        }} />

                    <Button variant="contained" disabled={!selectionModel.length} onClick={onDeleteAttdendants}><DeleteIcon /> Delete</Button>
                </Grid>
                <Grid item xs={2}>
                    <Typography>Add more attendants</Typography>
                    <Form schema={schema} onSubmit={onCreateAttendents} validator={validator} />
                </Grid>
            </Grid>
        </>
    )
}

export default Attendents