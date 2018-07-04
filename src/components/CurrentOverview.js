import React from 'react';
import { Grid, Statistic } from 'semantic-ui-react';
import Skycons from 'skycons-component';

const colors = {
  'clear-day': '#FFD700',
  'clear-night': '#008080',
  rain: '#0E6EB8',
  snow: '#0E6EB8',
  sleet: '#0E6EB8',
  fog: '#016936',
  cloudy: '#A0A0A0',
  wind: '#32CD32',
  'partly-cloudy-day': '#A0A0A0',
  'partly-cloudy-night': '#A0A0A0',
};

const CurrentOverview = props => (
  <Grid.Column centered>
    <Grid.Row>
      <Skycons
        animate
        iconColor={colors[props.weather.imageId]}
        style={{ width: 130, height: 130, align: 'center' }}
        icon={props.weather.imageId}
      />
    </Grid.Row>
    <Grid.Row>
      <Statistic size="huge" color="olive">
        <Statistic.Value>{Math.round(props.weather.temperature)}</Statistic.Value>
        <Statistic.Label>Degrees</Statistic.Label>
      </Statistic>
    </Grid.Row>
  </Grid.Column>
);
export default CurrentOverview;
