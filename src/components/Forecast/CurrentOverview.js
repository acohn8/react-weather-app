import React from 'react';
import { Grid, Statistic } from 'semantic-ui-react';
import Skycons from 'skycons-component';

const CurrentOverview = ({ weather }) => (
  <Grid columns={4} centered relaxed>
    <Grid.Row centered>
      <Skycons animate iconColor="grey" style={{ width: 130, height: 130 }} icon={weather.icon} />
    </Grid.Row>
    <Grid.Row centered>
      <Statistic size="huge" color="olive">
        <Statistic.Value>{Math.round(weather.temperature)}</Statistic.Value>
        <Statistic.Label>Degrees</Statistic.Label>
      </Statistic>
    </Grid.Row>
  </Grid>
);
export default CurrentOverview;
