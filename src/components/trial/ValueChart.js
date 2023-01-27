import {Line} from "react-chartjs-2";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {balloonSpeedPoints, balloonValuePoints, trials, isDisplayingMoneyOutcome} from "../../slices/gameDataSlice";
import {Stack} from "@mui/material";

export function ValueChart() {
    const isDisplayingMoneyOutcomeS = useSelector(isDisplayingMoneyOutcome);
    const trialNum = useSelector(trials);
    const valuePoints = useSelector(balloonValuePoints);
    const speedPoints = useSelector(balloonSpeedPoints);

    const labelss = Array.from({length: trialNum + (isDisplayingMoneyOutcomeS ? 1 : 0)}, (_, i) => i + 1);
    const data = {
        labels: labelss,
        datasets: [
            {
                label: 'Value history',
                data: valuePoints,
                fill: false,
                backgroundColor: 'rgb(14,133,255)',
                borderColor: 'rgba(99,104,255,0.2)',
            },
        ],
    };


    const data2 = {
        labels: labelss,
        datasets: [
            {
                label: 'Speed history',
                data: speedPoints,
                fill: false,
                backgroundColor: 'rgb(141,168,181)',
                borderColor: 'rgba(99,104,255,0.2)',
            },
        ],
    };


    const options = {
        aspectRatio: 3.5,
        animation: {
            duration: 0
        },
        scales: {
            y:
                {
                    grid: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true,
                        major: true,
                        callback: function(value, index, values) {
                            if (value === 2 || value === -2) return '$'+value
                            return '';
                        }
                    },
                    suggestedMax: 2,
                    suggestedMin: -2
                },
        },
    };

    const options2 = {
        aspectRatio: 3.5,
        animation: {
            duration: 0
        },
        scales: {
            y:
                {
                    display: false,
                    ticks: {
                        beginAtZero: true,
                    },
                    suggestedMax: 20
                },
        },
    };
    return (
      <>
          <Stack
              height={"100%"}
          >
              <Line data={data} options={options} />
              <Line style={{ paddingLeft: '25px'}} data={data2} options={options2} />
          </Stack>
      </>  
    );
}