import {
    DataGrid, GridToolbarDensitySelector,
    GridToolbarContainer, GridToolbarExportContainer, GridCsvExportMenuItem
} from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';

const columns = [
    { field: 'username', headerName: 'Email', width: 200 },
    { field: 'gender', headerName: 'gender', width: 80 },
    { field: 'age', headerName: 'age', width: 80 },
    { field: 'major', headerName: 'major', width: 150 },
    { field: 'mcq1', headerName: 'mcq1', width: 50 },
    { field: 'mcq2', headerName: 'mcq2', width: 50 },
    { field: 'mcq3', headerName: 'mcq3', width: 50 },
    { field: 'mcq4', headerName: 'mcq4', width: 50 },
    { field: 'mcq5', headerName: 'mcq5', width: 50 },
    { field: 'mcq6', headerName: 'mcq6', width: 50 },
    { field: 'mcq7', headerName: 'mcq7', width: 50 },
    { field: 'mcq8', headerName: 'mcq8', width: 50 },
    { field: 'strategy', headerName: 'strategy', width: 70 },
];

const calcuateCorrectness = (attendant) => {
    if (!attendant.quizAnswers) {
        return {};
    }
    const solution = {
        mcq1: 2,
        mcq2: 1,
        mcq3: 2,
        mcq4: 2,
        mcq5: 3,
        mcq6: 3,
        mcq7: 2,
        mcq8: 2,
    }

    return {
        mcq1: attendant.quizAnswers.mcq1 === solution.mcq1 ? 1 : 0,
        mcq2: attendant.quizAnswers.mcq1 === solution.mcq2 ? 1 : 0,
        mcq3: attendant.quizAnswers.mcq1 === solution.mcq3 ? 1 : 0,
        mcq4: attendant.quizAnswers.mcq1 === solution.mcq4 ? 1 : 0,
        mcq5: attendant.quizAnswers.mcq1 === solution.mcq5 ? 1 : 0,
        mcq6: attendant.quizAnswers.mcq1 === solution.mcq6 ? 1 : 0,
        mcq7: attendant.quizAnswers.mcq1 === solution.mcq7 ? 1 : 0,
        mcq8: attendant.quizAnswers.mcq1 === solution.mcq8 ? 1 : 0,
    }
}

const AttendentsInfo = ({ attendants }) => {
    const { alias } = useParams();
    const rows = attendants.map(attendant => Object.assign({
        id: attendant.id,
        username: attendant.username,
        age: attendant.age,
        gender: attendant.gender,
        major: attendant.major,
    }, calcuateCorrectness(attendant), { strategy: attendant.strategy }));

    const csvOptions = { fileName: `${alias}-attendant-choices` };
    const CustomToolbar = (props) => (
        <GridToolbarContainer {...props}>
            <GridToolbarDensitySelector />
            <GridToolbarExportContainer {...props}>
                <GridCsvExportMenuItem options={csvOptions} />
            </GridToolbarExportContainer>
        </GridToolbarContainer>
    );

    return (
        <DataGrid autoHeight rows={rows} columns={columns}
            components={{ Toolbar: CustomToolbar }}
            initialState={{
                sorting:
                {
                    sortModel: [{
                        field: 'username'
                    }]
                }
            }} />
    )
}

export default AttendentsInfo