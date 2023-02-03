import { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { extractXpData } from '../../util/xp_data'

const columns = [
    { field: 'id', headerName: 'Trial #', width: 100 },
    { field: 'value', headerName: 'value', width: 100 },
    { field: 'speed', headerName: 'speed', width: 100 },
    { field: 'aberration', headerName: 'aberration', width: 100 },
    { field: 'shift', headerName: 'shift', width: 100 },
    { field: 'reaction', headerName: 'Reaction ms', width: 100 },
    { field: 'choice', headerName: 'choice', width: 100 },
    { field: 'outcome', headerName: '$ outcome', valueFormatter: p => `$ ${p.value}`, width: 100 },
    { field: 'sumOutcome', headerName: '$ accumulate', valueFormatter: p => `$ ${p.value}`, width: 100 },
    { field: 'pickedOutcome', headerName: '$ picked', valueFormatter: p => `$ ${p.value || 0}`, width: 100 },
];

const AttendentDataTable = ({ attedent }) => {
    const { xpData, xpRecord } = attedent;
    const rows = extractXpData(xpData, xpRecord);

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