import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Alert from './Alert';
import CurrentOverview from './CurrentOverview';
import WeatherList from './Weatherlist';

const CityHeader = ({ forecast, alerts }) => (
  <div>
    <Header size="large">
      Now
      <Header.Subheader>
        {forecast.current.summary}
        {alerts.length > 0 && alerts.map(alert => <Alert alert={alert} key={alert} />)}
      </Header.Subheader>
    </Header>
    <Grid columns={4} centered relaxed>
      <Grid.Column>
        <CurrentOverview />
      </Grid.Column>
    </Grid>
    <WeatherList />
  </div>
);

const mapStateToProps = state => ({
  forecast: state.weather.forecast,
  alerts: state.weather.alerts,
});

export default connect(mapStateToProps)(CityHeader);
