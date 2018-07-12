import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import PrecipBar from './PrecipBar';
import TempLine from './TempLine';
import TempVBar from './NewTempBar';

const TodayAndTomorrow = ({ forecast }) => (
  <div>
    <Header size="large">
      Today and Tomorrow
      <Header.Subheader>{forecast.summary}</Header.Subheader>
    </Header>
    <Grid centered stackable columns={2}>
      <Grid.Column>
        <Header size="small">Precipitation chance</Header>
        <PrecipBar forecast={forecast} />
      </Grid.Column>
      <Grid.Column>
        <Header size="small">Temperature and humidity</Header>
        {/* <TempLine forecast={forecast} /> */}
        <TempVBar forecast={forecast} />
      </Grid.Column>
    </Grid>
  </div>
);

export default TodayAndTomorrow;
