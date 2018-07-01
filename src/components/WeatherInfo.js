import React from 'react';
import { Statistic, Divider, Header, Card } from 'semantic-ui-react';
import CityHeader from './Header';
import ForecastCard from './ForecastCard';
import Bar from './Forecast';
import ForecastLoader from './Loader';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {
        temperature: '',
        high: '',
        low: '',
        conditions: '',
        imageId: '',
      },
      alerts: [],
      forecast: {
        hourly: {
          time: [],
          temperature: [],
          humidity: [],
          percipChance: [],
        },
        daily: [
          {
            time: '',
            high: '',
            low: '',
            humidity: '',
            percipChance: '',
          },
        ],
        minutely: { time: [], percipChance: [], percipIntensity: [] },
      },
      filter: '',
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ filter: '' }), this.getWeather();
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
      .then(this.filterForecast);
  };

  setWeather = weather => {
    console.log(weather);
    const dailyWeather = [];
    const currentAlerts = [];
    weather.alerts.forEach(alert => {
      currentAlerts.push({ title: alert.title, severity: alert.severity });
    });
    const currentWeather = {
      temperature: weather.currently.apparentTemperature,
      high: weather.daily.data[0].apparentTemperatureHigh,
      low: weather.daily.data[0].apparentTemperatureLow,
      conditions: weather.minutely.summary,
      imageId: weather.currently.icon,
    };
    const hourlyWeather = {
      time: weather.hourly.data.map(hour => hour.time),
      temperature: weather.hourly.data.map(hour => hour.apparentTemperature),
      humidity: weather.hourly.data.map(hour => hour.humidity),
      percipChance: weather.hourly.data.map(hour => hour.precipProbability),
    };

    weather.daily.data.forEach(day => {
      dailyWeather.push({
        time: day.time,
        high: day.apparentTemperatureHigh,
        low: day.apparentTemperatureLow,
        humidity: day.humidity,
        percipChance: day.precipProbability,
        summary: day.summary,
        imageId: day.icon,
      });
    });

    const minutelyWeather = {
      time: weather.minutely.data.map(minute => minute.time),
      percipChance: weather.minutely.data.map(minute => minute.precipProbability),
      percipIntensity: weather.minutely.data.map(minute => minute.percipIntensity),
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
          percipChance: newFilter.percipChance,
        },
      });
    } else {
      this.setState({ filter: newFilter });
    }
  };

  controlFilter = () => {
    if (this.state.filter === '') {
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
          <Statistic.Group widths="three" size="small">
            <Statistic color="purple">
              <Statistic.Value>{Math.round(this.state.weather.temperature)}</Statistic.Value>
              <Statistic.Label>Temperature</Statistic.Label>
            </Statistic>
            <Statistic color="orange">
              <Statistic.Value>{Math.round(this.state.weather.high)}</Statistic.Value>
              <Statistic.Label>High</Statistic.Label>
            </Statistic>
            <Statistic color="blue">
              <Statistic.Value>{Math.round(this.state.weather.low)}</Statistic.Value>
              <Statistic.Label>Low</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <Divider />
          <Header size="large">
            Today and Tomorrow
            <Header.Subheader>Temperature and chance of precipitation</Header.Subheader>
          </Header>
          <Bar forecast={this.state.filter} />
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
