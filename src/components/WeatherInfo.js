import React from 'react';
import { Statistic } from 'semantic-ui-react';

const WeatherInfo = ({ weather }) => (
  <div>
    <h1>{weather.nameToDisplay}</h1>
    <Statistic.Group>
      <Statistic color="grey">
        <Statistic.Value>
          {Math.round(weather.tempreture)} & {weather.conditions}
        </Statistic.Value>
        <Statistic.Label>Currently</Statistic.Label>
      </Statistic>
      <Statistic color="orange">
        <Statistic.Value>{Math.round(weather.high)}</Statistic.Value>
        <Statistic.Label>High</Statistic.Label>
      </Statistic>
      <Statistic color="violet">
        <Statistic.Value>{Math.round(weather.low)}</Statistic.Value>
        <Statistic.Label>Low</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  </div>
);

export default WeatherInfo;
