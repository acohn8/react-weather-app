import React from 'react';
import { Bar } from 'react-chartjs-2';

const chartOptions = {
  legend: {
    display: false,
  },
  elements: { point: { radius: 0 } },
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
  },
  ticks: {
    autoSkip: true,
  },
};

const BarChart = ({ forecast }) => {
  const chartData = {
    labels: forecast.time.map(date => date * 1000),
    datasets: [
      {
        type: 'line',
        fill: false,
        label: 'Temperature',
        backgroundColor: '#F2711B',
        borderColor: '#F2711B',
        data: forecast.temperature.map(data => Math.round(data)),
      },
      {
        type: 'bar',
        fill: false,
        label: 'Percipitation %',
        backgroundColor: '#2085D0',
        borderColor: '#2085D0',
        data: forecast.percipChance.map(hour => hour * 100),
      },
    ],
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
