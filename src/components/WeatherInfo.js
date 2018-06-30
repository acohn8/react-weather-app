import React from 'react';
import Error from './Error';
import Bar from './Forecast';
import ForecastForm from './Dropdown';
import { Statistic, Grid } from 'semantic-ui-react';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: { time: '', data: '' },
    };
  }

  // shouldComponentUpdate(nextProps) {
  //   if (this.props.location !== nextProps.location) {
  //     this.setState({ filter: { time: '', data: '' } });
  //   }
  // }

  filterForecast = (timespan, data) => {
    if (timespan !== '') {
      this.setState({
        filter: {
          time: this.props.forecast[timespan].time,
          data: this.props.forecast[timespan][data],
        },
      });
    }
  };

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
        <ForecastForm options={this.props.forecast} filter={this.filterForecast} />
        {this.state.filter.data === '' ? '' : <Bar forecast={this.state.filter} />}
      </Grid.Column>
    );
  }
}

export default WeatherInfo;
