import React from 'react';
import Nav from './Nav';
import Search from './Search';
import WeatherCard from './WeatherCard';
import ErrorMessage from './Error';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: '',
      weather: [{ tempreture: '', high: '', low: '', conditions: '', nameToDisplay: '' }],
      status: '',
    };
  }

  getCityWeather = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${
        this.state.city
      }&APPID=0334dfcacf233909f4631c759218a821`,
    )
      .then(res => res.json())
      .then(weather => this.setWeather(weather))
      .catch(err => this.setState({ status: 404 }));
  };

  setWeather = weather => {
    const weatherToSet = {
      tempreture: this.weatherToF(weather.main.temp),
      high: this.weatherToF(weather.main.temp_max),
      low: this.weatherToF(weather.main.temp_min),
      conditions: weather.weather[0].main,
      nameToDisplay: weather.name,
    };
    this.setState({ weather: [weatherToSet], status: 200 });
  };

  setCity = cityName => {
    this.setState({ city: cityName }, this.getCityWeather);
  };

  weatherToF = temp => {
    return temp * (9 / 5) - 459.67;
  };

  render() {
    return (
      <div className="ui container">
        <Nav />
        <div class="ui three column grid container center aligned">
          <div class="column ui container">
            <Search setCity={this.setCity} />
            {this.state.status === 200 ? <WeatherCard weather={this.state.weather} /> : ''}
            {this.state.status === 404 ? <ErrorMessage /> : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
