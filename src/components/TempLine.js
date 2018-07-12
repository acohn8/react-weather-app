import React from 'react';
import { Line } from 'react-chartjs-2';

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
  },
};

const TempLine = ({ forecast }) => {
  const chartData = {
    labels: forecast.map(hour => hour.time * 1000),
    datasets: [
      {
        type: 'line',
        fill: false,
        label: 'Temperature',
        backgroundColor: '#F2711B',
        borderColor: '#F2711B',
        data: forecast.map(hour => Math.round(hour.temperature)),
      },
      {
        type: 'line',
        label: 'Humidity %',
        backgroundColor: 'rgba(0, 181, 173, 0.2)',
        borderColor: 'rgba(0, 181, 173, 0.2)',
        data: forecast.map(hour => hour.humidity * 100),
      },
    ],
  };
  return <Line data={chartData} options={chartOptions} />;
};

export default TempLine;
