import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
import Box from '@mui/material/Box';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels,);

const plugins = [
    ChartDataLabels,
]

export default function BallOptionSkip({ winQty, lossQty, winCash, lossCash }) {
    const data = {
        datasets: [
            {
                label: 'count',
                data: [100],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        layout: {
            padding: 30,
        },
        plugins: {
            datalabels: {
                font: {
                    size: 20
                },
                formatter: function (val, context) {
                    return `get $0`;
                }
            },
        },
    }

    return <Box sx={{ p: 3 }}>
        <Pie data={data} options={options} plugins={plugins} />
    </Box>
}
