import React from 'react';
import Nav from './Nav';
import Search from './Search';
import WeatherCard from './WeatherCard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: '',
      weather: [{ tempreture: '', high: '', low: '', conditions: '', nameToDisplay: '' }],
    };
  }

  getCityWeather = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${
        this.state.city
      }&APPID=0334dfcacf233909f4631c759218a821`,
    )
      .then(res => res.json())
      .then(weather => this.setWeather(weather));
  };

  setWeather = weather => {
    const weatherToSet = {
      tempreture: this.weatherToF(weather.main.temp),
      high: this.weatherToF(weather.main.temp_max),
      low: this.weatherToF(weather.main.temp_min),
      conditions: weather.weather[0].main,
      nameToDisplay: weather.name,
    };
    this.setState({ weather: [weatherToSet] });
  };

  setCity = cityName => {
    this.setState({ city: cityName }, this.getCityWeather);
  };

  weatherToF = temp => {
    return temp * (9 / 5) - 459.67;
  };

  render() {
    return (
      <div>
        <Nav />
        <div className="ui raised  text container segment">
          <div className="ui two column centered grid">
            <div className="column">
              <Search setCity={this.setCity} />
              {this.state.city ? <WeatherCard weather={this.state.weather} /> : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
