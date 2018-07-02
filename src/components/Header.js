import React from 'react';
import { Header, Grid, Image } from 'semantic-ui-react';
import Skycons from 'skycons-component';
import Alert from './Alert';

const colors = {
  'clear-day': '#FFD700',
  'clear-night': '#008080',
  rain: '#0E6EB8',
  snow: '#0E6EB8',
  sleet: '#0E6EB8',
  fog: '#016936',
  cloudy: '#A0A0A0',
  wind: '#32CD32',
  'partly-cloudy-day': '#A0A0A0',
  'partly-cloudy-night': '#A0A0A0',
};
const CityHeader = props => (
  <Grid padded verticalAlign="middle">
    <Grid.Row>
      <Grid.Column width={3}>
        <Image>
          <Skycons
            animate
            iconColor={colors[props.image]}
            style={{ width: 64, height: 64 }}
            icon={props.image}
          />
        </Image>
      </Grid.Column>
      <Grid.Column width={10}>
        <Header size="huge">
          {props.city}
          <Header.Subheader>{props.conditions}</Header.Subheader>
        </Header>
      </Grid.Column>
      {props.alerts.length > 0 ? (
        <Grid.Column width={3}>
          <Alert alerts={props.alerts} />
        </Grid.Column>
      ) : null}
    </Grid.Row>
  </Grid>
);

export default CityHeader;
