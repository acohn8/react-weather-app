import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import WeatherGraph from './WeatherGraph';

const TodayAndTomorrow = ({ forecast }) => (
  <div>
    <Header size="large">
      Today and Tomorrow
      <Header.Subheader>{forecast.summary}</Header.Subheader>
    </Header>
    <Header size="small">Temperature & precipitation chance</Header>
    <Grid.Row style={{ height: '30%' }}>
      <WeatherGraph forecast={forecast.data} />
    </Grid.Row>
  </div>
);

export default TodayAndTomorrow;
