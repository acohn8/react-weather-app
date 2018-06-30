import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Divider } from 'semantic-ui-react';

const chartOptions = {
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          display: false,
        },
      },
    ],
  },
};

const BarChart = ({ forecast }) => {
  console.log(forecast);
  const chartData = {
    labels: forecast.time.map(date => new Date(date * 1000)),
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

  return (
    <div>
      <Divider />
      <h4>Upcoming Temperature and Percipitation Chance</h4>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
