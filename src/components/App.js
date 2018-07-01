import React from 'react';
import Nav from './Nav';
import Search from './Search';
import WeatherInfo from './WeatherInfo';
import Error from './Error';
import { Grid, Card, Header } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { name: '', coords: [] },
      load_failed: false,
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
            location: {
              name: geoData.features[0].place_name,
              coords: geoData.features[0].center,
            },
          },
          this.getWeather,
        ),
      )
      .catch(error => {
        this.setState({ load_failed: true });
      });
  };

  controlRender = () => {
    if (this.state.load_failed === true) {
      return <Error />;
    } else if (this.state.location.name === '') {
      return null;
    } else {
      return <WeatherInfo location={this.state.location} />;
    }
  };

  render() {
    return (
      <div>
        <Nav />
        <Grid centered columns={4}>
          <Grid.Column>
            <Search getLocation={this.searchforLocation} />
          </Grid.Column>
          <Grid.Row centered columns={2}>
            <Grid.Column>{this.controlRender()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
