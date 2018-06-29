import React from 'react';
import Error from './Error';
import { Statistic } from 'semantic-ui-react';

const WeatherInfo = ({ weather }) => (
  <Statistic.Group widths="four" size="small">
    <Statistic color="grey">
      <Statistic.Value>{weather.conditions}</Statistic.Value>
      <Statistic.Label>Conditions</Statistic.Label>
    </Statistic>
    <Statistic color="green">
      <Statistic.Value>{Math.round(weather.tempreture)}</Statistic.Value>
      <Statistic.Label>Tempreture</Statistic.Label>
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
