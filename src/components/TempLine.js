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

const TempLineChart = ({ forecast }) => {
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
        type: 'line',
        label: 'Humidity %',
        backgroundColor: 'rgba(0, 181, 173, 0.2)',
        borderColor: 'rgba(0, 181, 173, 0.2)',
        data: forecast.humidity.map(hour => hour * 100),
      },
    ],
  };
  return <Line data={chartData} options={chartOptions} />;
};

export default TempLineChart;
