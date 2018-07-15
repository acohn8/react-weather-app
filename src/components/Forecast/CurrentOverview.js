import React from 'react';
import { Grid, Statistic } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Skycons from 'skycons-component';

const CurrentOverview = ({ forecast }) => (
  <Grid columns={4} centered relaxed>
    <Grid.Row centered>
      <Skycons
        animate
        iconColor="grey"
        style={{ width: 130, height: 130 }}
        icon={forecast.current.icon}
      />
    </Grid.Row>
    <Grid.Row centered>
      <Statistic size="huge" color="olive">
        <Statistic.Value>{Math.round(forecast.current.temperature)}</Statistic.Value>
        <Statistic.Label>Degrees</Statistic.Label>
      </Statistic>
    </Grid.Row>
  </Grid>
);

const mapStateToProps = state => ({
  forecast: state.weather.forecast,
});

export default connect(mapStateToProps)(CurrentOverview);
