import { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { extractXpData } from '../../util/xp_data'

const columns = [
    { field: 'id', headerName: 'Trial #', width: 100 },
    { field: 'value', headerName: 'value', width: 100 },
    { field: 'speed', headerName: 'speed', width: 100 },
    { field: 'aberration', headerName: 'aberration', width: 100 },
    { field: 'shift', headerName: 'shift', width: 100 },
    { field: 'reactionTime', headerName: 'Reaction ms', width: 100 },
    { field: 'choice', headerName: 'choice', width: 100 },
    { field: 'outcome', headerName: '$ outcome', width: 100 },
    { field: 'sumOutcome', headerName: '$ accumulate', width: 100 },
    { field: 'pickedOutcome', headerName: '$ picked', width: 100 },
];

const AttendentDataTable = ({ attedent }) => {
    const { xpData } = attedent;
    const rows = extractXpData(xpData);

    useEffect(() => {

    }, [])

    return (
        <>
            <DataGrid autoHeight rows={rows} columns={columns} rowHeight={24} initialState={{
                pagination: {
                    // pageSize: xpConfig.numberOfTrials || 400,
                },
            }} />
        </>
    )
}

export default AttendentDataTable