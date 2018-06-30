import React from 'react';
import Error from './Error';
import Bar from './Forecast';
import { Statistic, Grid } from 'semantic-ui-react';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch() {
    this.setState({ error: true });
  }
  render() {
    const weather = this.props.weather;
    if (this.state.error) {
      return <Error />;
    }
    return (
      <Grid.Column>
        <Statistic.Group widths="four" size="small">
          <Statistic color="grey">
            <Statistic.Value>{weather.conditions}</Statistic.Value>
            <Statistic.Label>Conditions</Statistic.Label>
          </Statistic>
          <Statistic color="green">
            <Statistic.Value>{Math.round(weather.temperature)}</Statistic.Value>
            <Statistic.Label>Temperature</Statistic.Label>
          </Statistic>
          <Statistic color="orange">
            <Statistic.Value>{Math.round(weather.high)}</Statistic.Value>
            <Statistic.Label>High</Statistic.Label>
          </Statistic>
          <Statistic color="teal">
            <Statistic.Value>{Math.round(weather.low)}</Statistic.Value>
            <Statistic.Label>Low</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        <Bar forecast={this.props.forecast} />
      </Grid.Column>
    );
  }
}

export default WeatherInfo;
