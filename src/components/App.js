import { Grid, Container, Item, Icon, Divider } from 'semantic-ui-react';

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
        name: response.features[0].text,
        coords: response.features[0].center,
      },
    });
  };

  controlRender = () => {
    if (this.state.error === true) {
      return;
    } else if (this.state.location.name === '') {
      return null;
    } else {
      return;
    }
  };

  render() {
    return (
      <div>
        <Nav location={this.state.location.name} />
        <Container style={{ marginTop: '3em' }}>
          <Grid stackable centered relaxed>
            <Grid.Column>
              <Search setLocation={this.setLocation} />
              <Grid.Row>
                {this.state.error === true && <Error />}
                {this.state.location.coords.length === 2 && (
                  <WeatherInfo location={this.state.location} />
                )}
              </Grid.Row>
              <Grid.Row>
                <Divider section hidden />
                <small>
                  <div>Weather: Powered by Dark Sky</div>
                  <div>
                    Geocoding: <a href="https://www.mapbox.com/about/maps/">© Mapbox</a>,
                    <a href="https://www.openstreetmap.org/about/">© OpenStreetMap</a>
                  </div>
                </small>
                <div>
                  <Item as="a" href="https://github.com/acohn8/react-weather-app">
                    <Icon name="github" size="large" color="grey" />
                  </Item>
                </div>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
