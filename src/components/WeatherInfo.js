import React from 'react';
import Error from './Error';
import Bar from './Forecast';
import ForecastForm from './Dropdown';
import { Statistic, Grid } from 'semantic-ui-react';

const WeatherInfo = ({ weather }) => (
  <Statistic.Group widths="four" size="tiny">
    <Statistic color="grey">
      <Statistic.Value>{weather.conditions}</Statistic.Value>
      <Statistic.Label>Conditions</Statistic.Label>
    </Statistic>
    <Statistic color="green">
      <Statistic.Value>{Math.round(weather.temperature)}</Statistic.Value>
      <Statistic.Label>Temperature</Statistic.Label>
    </Statistic>
    <Statistic color="orange">
      <Statistic.Value>{Math.round(weather.high)}</Statistic.Value>
      <Statistic.Label>High</Statistic.Label>
    </Statistic>
    <Statistic color="teal">
      <Statistic.Value>{Math.round(weather.low)}</Statistic.Value>
      <Statistic.Label>Low</Statistic.Label>
    </Statistic>
  </Statistic.Group>
);

export default WeatherInfo;
