import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from "../../../lib/datalabel";
import Box from '@mui/material/Box';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels,);

const plugins = [
    ChartDataLabels,
]

export default function BallOption({ winQty, lossQty, winCash, lossCash }) {
    const winRatio = Math.round(5 * winQty / 100);
    const lossRatio = Math.round(5 * lossQty / 100) || 1;

    const data = {
        // labels: ['Red', 'Blue'],
        datasets: [
            {
                label: 'count',
                data: [winQty, lossQty],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
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
                // color: 'pink',
                font: {
                    size: 20
                },
                labels: {
                    title: {
                        font: {
                            // weight: 'bold'
                        }
                    },
                    value: {
                        // color: 'red'
                    }
                },
                formatter: function (val, context) {
                    if (context.dataIndex === 0) {
                        return `win $${winCash}|${winRatio}`;
                    } else {
                        return `lose -$${-lossCash}|${lossRatio}`;
                    }
                }
            },
        },
    }

    return <Box sx={{ p: 3 }}>
        <Pie data={data} options={options} plugins={plugins} />
    </Box>
}
