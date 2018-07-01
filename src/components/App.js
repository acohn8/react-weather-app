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
      .catch(err => {
        this.setState({ error: true });
      });
  };

  controlRender = () => {
    if (this.state.error === true) {
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
          <Grid.Row centered columns={1}>
            <Container>
              <Grid.Column>{this.controlRender()}</Grid.Column>
            </Container>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
