import React from 'react';
import { Grid, Item, Icon } from 'semantic-ui-react';

const Footer = () => (
  <Grid.Row>
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
);

export default Footer;
