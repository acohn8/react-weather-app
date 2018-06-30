import React from 'react';
import Nav from './Nav';
import Search from './Search';
import WeatherInfo from './WeatherInfo';
import { Grid, Header } from 'semantic-ui-react';
import Bar from './Forecast';
import ForecastForm from './Dropdown';

const baseState = {
  location: { name: '', coords: [] },
  weather: {
    temperature: '',
    high: '',
    low: '',
    conditions: '',
    imageId: '',
  },
  forecast: {
    hourly: {
      time: [],
      temperature: [],
      humidity: [],
      percipChance: [],
    },
    daily: {
      time: [],
      high: [],
      low: [],
      humidity: [],
      percipChance: [],
    },
    minutely: { time: [], percipChance: [], percipIntensity: [] },
  },
  filter: '',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { name: '', coords: [] },
      weather: {
        temperature: '',
        high: '',
        low: '',
        conditions: '',
        imageId: '',
      },
      forecast: {
        hourly: {
          time: [],
          temperature: [],
          humidity: [],
          percipChance: [],
        },
        daily: {
          time: [],
          high: [],
          low: [],
          humidity: [],
          percipChance: [],
        },
        minutely: { time: [], percipChance: [], percipIntensity: [] },
      },
      filter: '',
    };
  }

  searchforLocation = city => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A`,
    )
      .then(res => res.json())
      .then(geoData =>
        this.setState(
          {
            location: { name: geoData.features[0].place_name, coords: geoData.features[0].center },
            filter: '',
          },
          this.getWeather,
        ),
      );
  };

  getWeather = () => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1114b767335760c2ae618d019fe72dd0/${
        this.state.location.coords[1]
      },${this.state.location.coords[0]}`,
    )
      .then(res => res.json())
      .then(weather => this.setWeather(weather));
  };

  setWeather = weather => {
    const currentWeather = {
      temperature: weather.currently.apparentTemperature,
      high: weather.daily.data[0].apparentTemperatureHigh,
      low: weather.daily.data[0].apparentTemperatureLow,
      conditions: weather.currently.summary,
      imageId: weather.currently.icon,
    };
    const hourlyWeather = {
      time: weather.hourly.data.map(hour => hour.time),
      temperature: weather.hourly.data.map(hour => hour.apparentTemperature),
      humidity: weather.hourly.data.map(hour => hour.humidity),
      percipChance: weather.hourly.data.map(hour => hour.precipProbability),
    };
    const dailyWeather = {
      time: weather.daily.data.map(day => day.time),
      high: weather.daily.data.map(day => day.apparentTemperatureHigh),
      low: weather.daily.data.map(day => day.apparentTemperatureLow),
      humidity: weather.daily.data.map(day => day.humidity),
      percipChance: weather.daily.data.map(day => day.precipProbability),
    };
    const minutelyWeather = {
      time: weather.minutely.data.map(minute => minute.time),
      percipChance: weather.minutely.data.map(minute => minute.precipProbability),
      percipIntensity: weather.minutely.data.map(minute => minute.percipIntensity),
    };
    this.setState(
      {
        weather: currentWeather,
        forecast: {
          hourly: hourlyWeather,
          daily: dailyWeather,
          minutely: minutelyWeather,
        },
      },
      this.filterForecast,
    );
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

  controlRender = () => {
    if (this.state.filter === '') {
      return '';
    } else {
      return (
        <div>
          <Header as="h1">{this.state.location.name}</Header>
          <WeatherInfo
            location={this.state.location}
            weather={this.state.weather}
            forecast={this.state.forecast}
          />
          <Bar forecast={this.state.filter} />
        </div>
      );
    }
  };

  render() {
    const toRender = this.controlRender();
    return (
      <div>
        <Nav />
        <Grid centered columns={4}>
          <Grid.Column>
            <Search getLocation={this.searchforLocation} />
          </Grid.Column>
          <Grid.Row centered columns={2}>
            <Grid.Column>{toRender}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
