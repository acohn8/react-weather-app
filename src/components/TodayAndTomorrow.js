import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import PrecipBar from './PrecipBar';
import TempLine from './TempLine';
import TempVBar from './NewTempBar';
import PrecipVBar from './NewPercipBar';

const TodayAndTomorrow = ({ forecast }) => (
  <div>
    <Header size="large">
      Today and Tomorrow
      <Header.Subheader>{forecast.summary}</Header.Subheader>
    </Header>
    <Grid centered stackable columns={2}>
      <Grid.Column>
        <Header size="small">Precipitation chance</Header>
        <PrecipVBar forecast={forecast.data} />
      </Grid.Column>
      <Grid.Column>
        <Header size="small">Temperature </Header>
        <TempVBar forecast={forecast.data} />
      </Grid.Column>
    </Grid>
  </div>
);

export default TodayAndTomorrow;
