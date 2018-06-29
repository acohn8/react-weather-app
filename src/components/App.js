import React from 'react';
import Nav from './Nav';
import Search from './Search';
import WeatherInfo from './WeatherInfo';
import Bar from './Forecast';
import { Grid } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weather: { tempreture: '', high: '', low: '', conditions: '', nameToDisplay: '' },
      status: '',
      forecast: { forecastDates: [], forecastHigh: [], forecastHumidity: [] },
    };
  }

  formatCity = () => {
    return this.state.city.split(' ').join('%20');
  };

  getCityWeather = () => {
    return fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.formatCity()}&APPID=0334dfcacf233909f4631c759218a821`,
    )
      .then(res => res.json())
      .then(weather => this.setWeather(weather))
      .catch(err => this.setState({ status: 404 }))
      .then(this.getCityForecast);
  };

  getCityForecast = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast/?q=${this.formatCity()}&APPID=0334dfcacf233909f4631c759218a821`,
    )
      .then(res => res.json())
      .then(forecast => this.setForecast(forecast));
  };

  setWeather = weather => {
    const weatherToSet = {
      tempreture: this.weatherToF(weather.main.temp),
      high: this.weatherToF(weather.main.temp_max),
      low: this.weatherToF(weather.main.temp_min),
      conditions: weather.weather[0].main,
      nameToDisplay: weather.name,
      imageId: weather.weather[0].icon,
    };
    this.setState({ weather: weatherToSet, status: 200 });
  };

  setForecast = forecast => {
    const forecastDatesToSet = forecast.list.map(day => day.dt);
    const forecastHighToSet = forecast.list.map(day => this.weatherToF(day.main.temp_max));
    const forecastHumidityToSet = forecast.list.map(day => day.main.humidity);
    this.setState({
      forecast: {
        forecastDates: forecastDatesToSet,
        forecastHigh: forecastHighToSet,
        forecastHumidity: forecastHumidityToSet,
      },
    });
  };

  setCity = cityName => {
    this.setState({ city: cityName, forecastTemps: [], forecastDates: [] }, this.getCityWeather);
  };

  weatherToF = temp => {
    return temp * (9 / 5) - 459.67;
  };

  render() {
    return (
      <div>
        <Nav />
        <Grid centered columns={4}>
          <Grid.Column>
            <Search setCity={this.setCity} />
          </Grid.Column>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <h1>{this.state.weather.nameToDisplay}</h1>
              <WeatherInfo weather={this.state.weather} />
              {this.state.forecast.forecastDates.length > 0 ? (
                <Bar forecast={this.state.forecast} />
              ) : (
                ''
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
