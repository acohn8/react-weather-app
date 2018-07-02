import React from 'react';
import Nav from './Nav';
import Search from './Search';
import WeatherInfo from './WeatherInfo';
import Error from './Error';
import { Grid, Container } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { name: '', coords: [] },
      error: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.setState({
        error: false,
      });
    }
  }

  geoLocate = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.searchforLocation(`${position.coords.longitude}, ${position.coords.latitude}`);
    });
  };

  searchforLocation = input => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A`,
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
      .catch(err => {
        this.setState({ error: true });
      });
  };

  controlRender = () => {
    if (this.state.error === true) {
      return (
        <Grid stackable centered columns={2}>
          <Error />
        </Grid>
      );
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
        <Grid stackable centered columns={4}>
          <Grid.Column>
            <Search getLocation={this.searchforLocation} locate={this.geoLocate} />
          </Grid.Column>
          <Grid.Row centered columns={1}>
            <Container>
              <Grid.Column>{this.controlRender()}</Grid.Column>
            </Container>
          </Grid.Row>
          <Grid.Row centered columns={1}>
            <small>
              Weather: Powered by Dark Sky<br />
              Geocoding: <a href="https://www.mapbox.com/about/maps/">© Mapbox</a>,
              <a href="https://www.openstreetmap.org/about/">© OpenStreetMap</a>
            </small>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
