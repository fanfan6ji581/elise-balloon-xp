import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from "../../../lib/datalabel";
import Box from '@mui/material/Box';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels,);

const plugins = [
    ChartDataLabels,
]

export default function BallOptionChart({ type, winQty, lossQty, winCash, lossCash }) {
    const winRatio = Math.round(5 * winQty / 100);
    const lossRatio = Math.round(5 * lossQty / 100) || 1;

    const data = {
        datasets: [
            {
                label: 'count',
                data: [winQty, lossQty],
                backgroundColor: [
                    type === 'a' ? 'rgba(54, 162, 235, 0.75)' : 'rgba(75, 192, 192, 0.75)',
                    type === 'a' ? 'rgba(75, 192, 192, 0.75)' : 'rgba(54, 162, 235, 0.75)',
                ],
                borderColor: [
                    type === 'a' ? 'rgba(54, 162, 235, 1)' : 'rgba(75, 192, 192, 1)',
                    type === 'a' ? 'rgba(75, 192, 192, 1)' : 'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        animation: {
            duration: 500,
        },
        layout: {
            padding: 15,
        },
        plugins: {
            datalabels: {
                color: '#fefefe',
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
            tooltip: {
                callbacks: {
                    label: function (context) {
                        if (context.dataIndex === 0) {
                            return `Blue count: ${context.parsed}`
                        } else {
                            return `Green count: ${context.parsed}`
                        }
                    }
                }
            }
        },
    }

    return <Box sx={{ p: 3 }}>
        <Pie data={data} options={options} plugins={plugins} />
    </Box>
}
