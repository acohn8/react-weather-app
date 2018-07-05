import { Grid, Container } from 'semantic-ui-react';

import React from 'react';
import Nav from './Nav';
import Search from './Search';
import WeatherInfo from './WeatherInfo';
import Error from './Error';

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

  setLocation = response => {
    this.setState({
      location: {
        name: response.features[0].place_name,
        coords: response.features[0].center,
      },
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
        <Nav location={this.state.location.name} />
        <Container>
          <Grid stackable centered relaxed>
            <Grid.Column>
              <Search setLocation={this.setLocation} />
              <Grid.Row>{this.controlRender()}</Grid.Row>
              <Grid.Row>
                <small>
                  Weather: Powered by Dark Sky<br />
                  Geocoding: <a href="https://www.mapbox.com/about/maps/">© Mapbox</a>,
                  <a href="https://www.openstreetmap.org/about/">© OpenStreetMap</a>
                </small>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
