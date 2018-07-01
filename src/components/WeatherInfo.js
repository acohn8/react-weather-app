import React from 'react';
import { Statistic, Divider, Header, Card, Grid } from 'semantic-ui-react';
import CityHeader from './Header';
import ForecastCard from './ForecastCard';
import Bar from './Forecast';
import ForecastLoader from './Loader';
import TempLineChart from './TempLine';
import Error from './Error';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {
        temperature: '',
        high: '',
        low: '',
        conditions: '',
        humidity: '',
        imageId: '',
      },
      alerts: [],
      forecast: {
        hourly: {
          time: [],
          temperature: [],
          humidity: [],
          precipChance: [],
        },
        daily: [
          {
            time: '',
            high: '',
            low: '',
            humidity: '',
            precipChance: '',
          },
        ],
        minutely: { time: [], precipChance: [], precipIntensity: [] },
      },
      filter: '',
      error: false,
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ filter: '', error: false }, this.getWeather());
    }
  }

  getWeather = () => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1114b767335760c2ae618d019fe72dd0/${
        this.props.location.coords[1]
      },${this.props.location.coords[0]}`,
    )
      .then(res => res.json())
      .then(weather => this.setWeather(weather))
      .catch(err => {
        this.setState({ error: true });
      })
      .then(this.filterForecast);
  };

  setWeather = weather => {
    const dailyWeather = [];
    const currentAlerts = [];
    if (typeof weather.alerts !== 'undefined' && weather.alerts.length > 0) {
      weather.alerts.forEach(alert => {
        currentAlerts.push({
          title: alert.title,
          index: weather.alerts.indexOf(alert),
          severity: alert.severity,
          description: alert.description,
        });
      });
    }
    const currentWeather = {
      temperature: weather.currently.apparentTemperature,
      high: weather.daily.data[0].apparentTemperatureHigh,
      low: weather.daily.data[0].apparentTemperatureLow,
      conditions: weather.minutely.summary,
      humidity: weather.currently.humidity,
      imageId: weather.currently.icon,
    };
    const hourlyWeather = {
      time: weather.hourly.data.map(hour => hour.time),
      temperature: weather.hourly.data.map(hour => hour.apparentTemperature),
      humidity: weather.hourly.data.map(hour => hour.humidity),
      precipChance: weather.hourly.data.map(hour => hour.precipProbability),
    };

    weather.daily.data.forEach(day => {
      dailyWeather.push({
        time: day.time,
        high: day.apparentTemperatureHigh,
        low: day.apparentTemperatureLow,
        humidity: day.humidity,
        precipChance: day.precipProbability,
        summary: day.summary,
        imageId: day.icon,
      });
    });

    const minutelyWeather = {
      time: weather.minutely.data.map(minute => minute.time),
      precipChance: weather.minutely.data.map(minute => minute.precipProbability),
      precipIntensity: weather.minutely.data.map(minute => minute.precipIntensity),
    };
    this.setState({
      weather: currentWeather,
      alerts: currentAlerts,
      forecast: {
        hourly: hourlyWeather,
        daily: dailyWeather,
        minutely: minutelyWeather,
      },
    });
  };

  filterForecast = (timespan = 'hourly') => {
    const newFilter = this.state.forecast[timespan];
    if (timespan === 'daily') {
      this.setState({
        filter: {
          time: newFilter.time,
          temperature: newFilter.high,
          precipChance: newFilter.precipChance,
        },
      });
    } else {
      this.setState({ filter: newFilter });
    }
  };

  controlFilter = () => {
    if (this.state.error === true) {
      return <Error />;
    } else if (this.state.filter === '') {
      return <ForecastLoader />;
    } else {
      return (
        <div>
          <CityHeader
            city={this.props.location.name}
            conditions={this.state.weather.conditions}
            image={this.state.weather.imageId}
            alerts={this.state.alerts}
          />
          <Statistic.Group widths="four" size="small">
            <Statistic color="purple">
              <Statistic.Value>{Math.round(this.state.weather.temperature)}</Statistic.Value>
              <Statistic.Label>Temperature</Statistic.Label>
            </Statistic>
            <Statistic color="teal">
              <Statistic.Value>{`${Math.round(
                this.state.weather.humidity * 100,
              )}%`}</Statistic.Value>
              <Statistic.Label>Humidity</Statistic.Label>
            </Statistic>
            <Statistic color="orange">
              <Statistic.Value>{Math.round(this.state.weather.high)}</Statistic.Value>
              <Statistic.Label>High</Statistic.Label>
            </Statistic>
            <Statistic color="olive">
              <Statistic.Value>{Math.round(this.state.weather.low)}</Statistic.Value>
              <Statistic.Label>Low</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <Divider />
          <Header size="large">Today and Tomorrow</Header>
          <Grid centered columns={2}>
            <Grid.Column>
              <Header size="small">Hourly precipitation chance</Header>
              <Bar forecast={this.state.filter} />
            </Grid.Column>
            <Grid.Column>
              <Header size="small">Hourly temperature and humidity</Header>
              <TempLineChart forecast={this.state.filter} />
            </Grid.Column>
          </Grid>
          <Header size="large">This Week</Header>
          <Card.Group itemsPerRow={4}>
            {this.state.forecast.daily.map(day => <ForecastCard key={day.time} data={day} />)}
          </Card.Group>
        </div>
      );
    }
  };

  render() {
    return this.controlFilter();
  }
}

export default WeatherInfo;
