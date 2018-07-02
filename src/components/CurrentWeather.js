import React from 'react';
import { Statistic } from 'semantic-ui-react';

const CurrentWeather = ({ weather }) => (
  <Statistic.Group widths="four" size="small">
    <Statistic color="purple">
      <Statistic.Value>{Math.round(weather.temperature)}</Statistic.Value>
      <Statistic.Label>Temperature</Statistic.Label>
    </Statistic>
    <Statistic color="teal">
      <Statistic.Value>{`${Math.round(weather.humidity * 100)}%`}</Statistic.Value>
      <Statistic.Label>Humidity</Statistic.Label>
    </Statistic>
    <Statistic color="orange">
      <Statistic.Value>{Math.round(weather.high)}</Statistic.Value>
      <Statistic.Label>High</Statistic.Label>
    </Statistic>
    <Statistic color="olive">
      <Statistic.Value>{Math.round(weather.low)}</Statistic.Value>
      <Statistic.Label>Low</Statistic.Label>
    </Statistic>
  </Statistic.Group>
);
export default CurrentWeather;
