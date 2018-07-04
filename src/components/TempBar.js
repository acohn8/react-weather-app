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
        stacked: true,
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
        stacked: true,
        ticks: {
          min: 0,
          max: 100,
          stepSize: 20,
        },
      },
    ],
  },
};

const TempBar = ({ forecast }) => {
  console.log(forecast.daily);
  const chartData = {
    labels: forecast.daily.map(date => date.time * 1000),
    datasets: [
      {
        type: 'bar',
        fill: false,
        label: 'High',
        backgroundColor: '#FE9A76',
        borderColor: '#FE9A76',
        data: forecast.daily.map(hour => Math.round(hour.high)),
        datalabels: true,
      },
      {
        type: 'bar',
        fill: false,
        label: 'Low',
        backgroundColor: '#F2701D',
        borderColor: '#F2701D',
        data: forecast.daily.map(hour => Math.round(hour.low)),
        datalabels: true,
      },
    ],
  };
  return <Bar data={chartData} options={chartOptions} />;
};

export default TempBar;
