import { Grid, Container, Divider } from 'semantic-ui-react';

import React from 'react';
import Nav from './components/Nav';
import WeatherInfo from './components/Forecast/WeatherInfo';
import SearchContainer from './components/Search/SearchContainer';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        name: '',
        coords: [],
      },
    };
  }

  saveLocation = (name, coords) => {
    this.setState({ location: { name: name, coords: coords } });
  };

  render() {
    return (
      <div>
        <Nav location={this.state.location.name} />
        <Container style={{ marginTop: '3em' }}>
          <Grid stackable centered relaxed>
            <Grid.Column>
              <SearchContainer saveLocation={this.saveLocation} />
              <Grid.Row>
                {this.state.location.coords.length === 2 && (
                  <WeatherInfo location={this.state.location} />
                )}
              </Grid.Row>
              <Divider section hidden />
              <Footer />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
