import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from "../../../lib/datalabel";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels,);

const plugins = [
    ChartDataLabels,
]

const blue = '#6495ED';
const green = '#50C878'

export default function BallOptionChart({ type, winQty, lossQty, winCash, lossCash }) {
    const winRatio = Math.round(10 * winQty / 100);
    const lossRatio = Math.round(10 * lossQty / 100) || 1;

    const data = {
        datasets: [
            {
                label: 'count',
                data: [winQty, lossQty],
                backgroundColor: [
                    type === 'a' ? blue : green,
                    type === 'a' ? green : blue,
                ],
                // borderColor: [
                //     type === 'a' ? '#7FFFD4	' : 'rgba(75, 192, 192, 1)',
                //     type === 'a' ? 'rgba(75, 192, 192, 1)' : '#7FFFD4	',
                // ],
                // borderWidth: 1,
            },
        ],
    };

    const options = {
        animation: {
            duration: 500,
        },
        layout: {
            padding: 0,
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
                        if (type === 'a') {
                            if (context.dataIndex === 0) {
                                return `Blue count: ${context.parsed}`
                            } else {
                                return `Green count: ${context.parsed}`
                            }
                        } else {
                            if (context.dataIndex === 0) {
                                return `Green count: ${context.parsed}`
                            } else {
                                return `Blue count: ${context.parsed}`
                            }
                        }
                    }
                }
            }
        },
    }

    return <>
        <Pie data={data} options={options} plugins={plugins} style={{ margin: 'auto' }} />
    </>
}
