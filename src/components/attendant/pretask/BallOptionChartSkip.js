import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
import Box from '@mui/material/Box';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels,);

const plugins = [
    ChartDataLabels,
]

export default function BallOptionSkip() {
    const data = {
        datasets: [
            {
                label: 'count',
                data: [100],
                backgroundColor: [
                    'rgba(80, 80, 80, 0.2)',
                ],
                borderColor: [
                    'rgba(80, 80, 80, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        animation: {
            duration: 0,
        },
        layout: {
            padding: 15,
        },
        plugins: {
            datalabels: {
                // color: '#fff',
                font: {
                    size: 20
                },
                formatter: function (val, context) {
                    return `get $0`;
                }
            },
            tooltip: {
                enabled: false,
            }
        },
    }

    return <Box sx={{ p: 3 }}>
        <Pie data={data} options={options} plugins={plugins} />
    </Box>
}
