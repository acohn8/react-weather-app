import React from 'react';
import { Line } from 'react-chartjs-2';
import { Divider } from 'semantic-ui-react';

const LineChart = (props) => {
  const chartData = {
    labels: props.dates.map(date => new Date(date * 1000)),
    datasets: [
      {
        fill: false,
        label: 'Tempreture',
        backgroundColor: '#9BBECC',
        borderColor: '#9BBECC',
        data: props.temps.map(temp => Math.round(temp)),
      },
    ],
  };

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

  return (
    <div>
      <Divider />
      <h4>Hourly Forecast</h4>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
