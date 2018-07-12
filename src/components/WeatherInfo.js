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
      alerts: [],
      forecast: {},
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.getWeather();
    }
  }

  getWeather = () => {
    this.setState({ loading: true, error: false }, () => {
      fetch(
        `https://cryptic-headland-94862.herokuapp.com/https://api.darksky.net/forecast/1114b767335760c2ae618d019fe72dd0/${
          this.props.location.coords[1]
        },${this.props.location.coords[0]}`,
      )
        .then(res => res.json())
        .then(weather => this.setWeather(weather))
        .catch(err => this.setState({ error: true }));
    });
  };

  setWeather = weather => {
    console.log(weather);
    const currentWeather = weather.currently;
    const dailyWeather = weather.daily;
    const hourlyWeather = weather.hourly;
    let currentAlerts;
    weather.alerts !== undefined ? (currentAlerts = weather.alerts) : (currentAlerts = []);
    this.setState({
      forecast: { daily: dailyWeather, current: currentWeather, hourly: hourlyWeather },
      alerts: currentAlerts,
      loading: false,
    });
  };

  render() {
    return (
      <div>
        {this.state.error === true && <Error />}
        {this.state.loading === true && <ForecastLoader />}
        {this.state.loading === false && (
          <div>
            <CityHeader
              currentWeather={this.state.forecast.current}
              dailyWeather={this.state.forecast.daily.data[0]}
              alerts={this.state.alerts}
            />
            <Divider section />
            <TodayAndTomorrow forecast={this.state.forecast.hourly} />
            <Divider section />
            <Header size="large">
              This Week
              <Header.Subheader>{this.state.forecast.daily.summary}</Header.Subheader>
            </Header>
            <Card.Group stackable itemsPerRow={4}>
              {this.state.forecast.daily.data.map(day => <ForecastCard key={day.time} day={day} />)}
            </Card.Group>
          </div>
        )}
      </div>
    );
  }
}

export default WeatherInfo;
