import React from 'react';
import { Divider, Header, Card } from 'semantic-ui-react';
import CityHeader from './Header';
import ForecastCard from './ForecastCard';
import TodayAndTomorrow from './TodayAndTomorrow';
import ForecastLoader from './Loader';
import Error from './Error';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {},
      alerts: [],
      forecast: {},
      loading: true,
      loaded: false,
      error: false,
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ error: false, loading: true }, this.getWeather);
    }
  }

  getWeather = () => {
    fetch(
      `https://cryptic-headland-94862.herokuapp.com/https://api.darksky.net/forecast/1114b767335760c2ae618d019fe72dd0/${
        this.props.location.coords[1]
      },${this.props.location.coords[0]}`,
    )
      .then(res => res.json())
      .then(weather => this.setWeather(weather))
      .catch(err => {
        this.setState({ error: true });
      });
  };

  setWeather = weather => {
    console.log(weather);
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

    const dailyWeather = weather.daily.data.map(day => {
      ({
        time: day.time,
        high: day.apparentTemperatureHigh,
        low: day.apparentTemperatureLow,
        humidity: day.humidity,
        precipChance: day.precipProbability,
        summary: day.summary,
        imageId: day.icon,
        wind: day.windSpeed,
      });
    });

    const currentWeather = {
      temperature: weather.currently.apparentTemperature,
      high: weather.daily.data[0].apparentTemperatureHigh,
      low: weather.daily.data[0].apparentTemperatureLow,
      conditions: weather.minutely.summary,
      humidity: weather.currently.humidity,
      wind: weather.currently.windSpeed,
      precipChance: weather.daily.data[0].precipProbability,
      uvIndex: weather.currently.uvIndex,
      sunrise: weather.daily.data[0].sunriseTime,
      sunset: weather.daily.data[0].sunsetTime,
      imageId: weather.currently.icon,
    };

    const hourlyWeather = weather.hourly.data;
    const tomorrowDesc = weather.daily.summary;

    this.setState(
      {
        weather: currentWeather,
        alerts: currentAlerts,
        forecast: {
          hourly: hourlyWeather,
          daily: dailyWeather,
        },
        tomorrowDesc: tomorrowDesc,
        loaded: true,
        loading: false,
      },
      console.log(this.state.forecast),
    );
  };

  render() {
    return (
      <div>
        {this.state.error === true && <Error />}
        {this.state.loading === true && <ForecastLoader />}
        {this.state.loading === false &&
          this.state.forecast.hourly.length > 0 && (
            <div>
              <CityHeader weather={this.state.weather} alerts={this.state.alerts} />
              <Divider section />
              <TodayAndTomorrow forecast={this.state.forecast.hourly} />
              <Divider section />
              <Header size="large">
                This Week
                <Header.Subheader>{this.state.tomorrowDesc}</Header.Subheader>
              </Header>
              <Card.Group stackable itemsPerRow={4}>
                {this.state.forecast.daily.map(day => <ForecastCard key={day.time} data={day} />)}
              </Card.Group>
            </div>
          )}
      </div>
    );
  }
}

export default WeatherInfo;
