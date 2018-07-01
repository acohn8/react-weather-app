import React from 'react';
import Nav from './Nav';
import Search from './Search';
import WeatherInfo from './WeatherInfo';
import { Grid, Card } from 'semantic-ui-react';
import Bar from './Forecast';
import CityHeader from './Header';
import Error from './Error';
import ForecastCard from './ForecastCard';

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
      error: false,
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
    //refactor other times to be like daily?
    console.log(weather);
    const dailyWeather = [];
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
    if (this.state.error === true) {
      return <Error />;
    }
    if (this.state.filter === '') {
      return '';
    } else {
      return (
        <div>
          <CityHeader
            city={this.state.location.name}
            conditions={this.state.weather.conditions}
            image={this.state.weather.imageId}
          />
          <WeatherInfo
            location={this.state.location}
            weather={this.state.weather}
            forecast={this.state.forecast}
          />
          <Card.Group itemsPerRow={4}>
            {this.state.forecast.daily.map(day => <ForecastCard key={day.time} data={day} />)}
          </Card.Group>
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
