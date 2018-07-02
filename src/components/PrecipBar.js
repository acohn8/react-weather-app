import React from 'react';
import { Bar } from 'react-chartjs-2';

const chartOptions = {
  legend: {
    display: false,
  },
  elements: { point: { radius: 0 } },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'dddd',
          },
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          min: 0,
          max: 100,
          stepSize: 20,
        },
      },
    ],
  },
};

const PrecipBar = ({ forecast }) => {
  const chartData = {
    labels: forecast.time.map(date => date * 1000),
    datasets: [
      {
        type: 'bar',
        fill: false,
        label: 'Precipitation %',
        backgroundColor: '#2085D0',
        borderColor: '#2085D0',
        data: forecast.precipChance.map(hour => hour * 100),
      },
    ],
  };
  return <Bar data={chartData} options={chartOptions} />;
};

export default PrecipBar;
