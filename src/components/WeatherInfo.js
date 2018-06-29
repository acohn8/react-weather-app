import React from 'react';
import { Statistic } from 'semantic-ui-react';

const WeatherInfo = ({ weather }) => {
  console.log(weather);
  return (
    <div>
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>{Math.round(weather.tempreture)}</Statistic.Value>
          <Statistic.Label>Currently</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{Math.round(weather.high)}</Statistic.Value>
          <Statistic.Label>High</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{Math.round(weather.low)}</Statistic.Value>
          <Statistic.Label>Low</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </div>
  );
};

export default WeatherInfo;
