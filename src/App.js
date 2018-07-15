import { Grid, Container, Divider } from 'semantic-ui-react';

import React from 'react';
import Nav from './components/Nav';
import WeatherInfo from './components/Forecast/WeatherInfo';
import SearchContainer from './components/Search/SearchContainer';
import Footer from './components/Footer';

const App = () => (
  <div>
    <Nav />
    <Container style={{ marginTop: '3em' }}>
      <Grid stackable centered relaxed>
        <Grid.Column>
          <SearchContainer />
          <Grid.Row>
            <WeatherInfo />
          </Grid.Row>
          <Divider section hidden />
          <Footer />
        </Grid.Column>
      </Grid>
    </Container>
  </div>
);

export default App;
