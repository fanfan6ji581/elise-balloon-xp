import {
    DataGrid, GridToolbarDensitySelector,
    GridToolbarContainer, GridToolbarExportContainer, GridCsvExportMenuItem
} from '@mui/x-data-grid';

const columns = [
    { field: 'mcq1', headerName: 'mcq1', width: 100 },
    { field: 'mcq2', headerName: 'mcq2', width: 100 },
    { field: 'mcq3', headerName: 'mcq3', width: 100 },
    { field: 'mcq4', headerName: 'mcq4', width: 100 },
    { field: 'mcq5', headerName: 'mcq5', width: 100 },
    { field: 'mcq6', headerName: 'mcq6', width: 100 },
    { field: 'mcq7', headerName: 'mcq7', width: 100 },
    { field: 'mcq8', headerName: 'mcq8', width: 100 },
    { field: 'strategy', headerName: 'strategy', width: 100 },
];

const AttendentInfo = ({ attendant }) => {
    const rows = [
        Object.assign({ id: attendant.id }, attendant.quizAnswers, { strategy: attendant.strategy }),
    ];

    const csvOptions = { fileName: `${attendant.xp_alias}-${attendant.username}-info` };
    const CustomToolbar = (props) => (
        <GridToolbarContainer {...props}>
            <GridToolbarDensitySelector />
            <GridToolbarExportContainer {...props}>
                <GridCsvExportMenuItem options={csvOptions} />
            </GridToolbarExportContainer>
        </GridToolbarContainer>
    );

    return (
        <>
            <DataGrid autoHeight rows={rows} columns={columns}
                components={{ Toolbar: CustomToolbar }}
            />
        </>
    )
}

export default AttendentInfo