import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import Alert from './Alert';
import CurrentOverview from './CurrentOverview';
import WeatherList from './Weatherlist';

const CityHeader = ({ currentWeather, alerts, dailyWeather }) => (
  <div>
    <Header size="large">
      Now
      <Header.Subheader>
        {currentWeather.summary}
        {alerts.length > 0 && alerts.map(alert => <Alert alert={alert} key={alert} />)}
      </Header.Subheader>
    </Header>
    <Grid columns={4} centered relaxed>
      <Grid.Column>
        <CurrentOverview weather={currentWeather} />
      </Grid.Column>
    </Grid>
    <WeatherList weather={dailyWeather} />
  </div>
);

export default CityHeader;
