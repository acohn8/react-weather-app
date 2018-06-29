import React from 'react';
import Nav from './Nav';
import Search from './Search';
import WeatherInfo from './WeatherInfo';
import Bar from './Forecast';
import Error from './Error';
import { Grid, Header } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weather: { tempreture: '', high: '', low: '', conditions: '', nameToDisplay: '' },
      forecast: { forecastDates: [], forecastHigh: [], forecastHumidity: [] },
      status: '',
    };
  }

  formatCity = () => {
    return this.state.city.split(' ').join('%20');
  };

  getCityWeather = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.formatCity()}&APPID=0334dfcacf233909f4631c759218a821`,
    )
      .then(res => res.json())
      .catch(err => this.setState({ status: 404 }))
      .then(weather => this.setWeather(weather))
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

  controlRender = () => {
    if (this.state.status === 200) {
      return (
        <Grid.Column>
          <WeatherInfo weather={this.state.weather} status={this.state.status} />
          <Bar forecast={this.state.forecast} />
        </Grid.Column>
      );
    } else if (this.state.status === 404) {
      return (
        <Grid.Column>
          <Error />;
        </Grid.Column>
      );
    }
  };

  render() {
    const toRender = this.controlRender();
    return (
      <div>
        <Nav city={this.state.weather.nameToDisplay} />
        <Grid centered columns={4}>
          <Grid.Column>
            <Search setCity={this.setCity} />
          </Grid.Column>
          <Grid.Row centered columns={2}>
            {toRender}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
