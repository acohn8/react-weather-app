import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Divider } from 'semantic-ui-react';

const BarChart = ({ forecast }) => {
  const chartData = {
    labels: forecast.forecastDates.map(date => new Date(date * 1000)),
    datasets: [
      {
        type: 'line',
        fill: false,
        label: 'High',
        backgroundColor: '#F04A58',
        borderColor: '#F04A58',
        data: forecast.forecastHigh.map(temp => Math.round(temp)),
      },
      {
        type: 'bar',
        fill: false,
        label: 'Humidity',
        backgroundColor: '#0396A6',
        borderColor: '#0396A6',
        data: forecast.forecastHumidity,
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
      <h4>Upcoming Temperature and Humidity</h4>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
