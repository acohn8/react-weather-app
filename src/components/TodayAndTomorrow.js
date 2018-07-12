import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import PrecipBar from './PrecipBar';
import TempLine from './TempLine';
import TempVBar from './NewTempBar';

const TodayAndTomorrow = ({ forecast }) => (
  <div>
    {console.log(forecast)}
    <Header size="large">
      Today and Tomorrow
      <Header.Subheader>{forecast.summary}</Header.Subheader>
    </Header>
    <Grid centered stackable columns={2}>
      <Grid.Column>
        <Header size="small">Precipitation chance</Header>
        <PrecipBar forecast={forecast.data} />
      </Grid.Column>
      <Grid.Column>
        <Header size="small">Temperature and humidity</Header>
        <TempLine forecast={forecast.data} />
      </Grid.Column>
    </Grid>
  </div>
);

export default TodayAndTomorrow;
