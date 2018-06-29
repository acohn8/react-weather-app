import React from 'react';
import Nav from './Nav';
import Search from './Search';
import CityWeather from './CityWeather';
import { Grid } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weather: { tempreture: '', high: '', low: '', conditions: '', nameToDisplay: '' },
      status: '',
      forecastTemps: [],
      forecastDates: [],
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
      .catch(err => this.setState({ status: 404 }));
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
    const forecastTempsToSet = forecast.list.map(day => this.weatherToF(day.main.temp_max));
    const forecastDatesToSet = forecast.list.map(day => day.dt);
    this.setState(
      { forecastTemps: forecastTempsToSet },
      this.setState({ forecastDates: forecastDatesToSet }),
    );
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
              <CityWeather
                weather={this.state.weather}
                status={this.state.status}
                forecast={this.getCityForecast}
                forecastDates={this.state.forecastDates}
                forecastTemps={this.state.forecastTemps}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
