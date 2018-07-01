import React from 'react';
import { Statistic, Divider } from 'semantic-ui-react';

const WeatherInfo = ({ weather }) => (
  <div>
    <Statistic.Group widths="three" size="small">
      <Statistic color="purple">
        <Statistic.Value>{Math.round(weather.temperature)}</Statistic.Value>
        <Statistic.Label>Temperature</Statistic.Label>
      </Statistic>
      <Statistic color="orange">
        <Statistic.Value>{Math.round(weather.high)}</Statistic.Value>
        <Statistic.Label>High</Statistic.Label>
      </Statistic>
      <Statistic color="blue">
        <Statistic.Value>{Math.round(weather.low)}</Statistic.Value>
        <Statistic.Label>Low</Statistic.Label>
      </Statistic>
    </Statistic.Group>
    <Divider />
  </div>
);

export default WeatherInfo;
