import { Grid, Container, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';

import React from 'react';
import Nav from './components/Nav';
import WeatherInfo from './components/Forecast/WeatherInfo';
import SearchContainer from './components/Search/SearchContainer';
import Footer from './components/Footer';

const App = props => (
  <div>
    <Nav />
    <Container style={{ marginTop: '3em' }}>
      <Grid stackable centered relaxed>
        <Grid.Column>
          <SearchContainer />
          <Grid.Row>{props.coords.length === 2 && <WeatherInfo />}</Grid.Row>
          <Divider section hidden />
          <Footer />
        </Grid.Column>
      </Grid>
    </Container>
  </div>
);

const mapStateToProps = state => ({ coords: state.coords, locationName: state.locationName });

export default connect(mapStateToProps)(App);
