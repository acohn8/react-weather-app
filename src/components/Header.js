import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import Skycons from 'skycons-component';
import Alert from './Alert';

const CityHeader = props => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={3}>
        <Skycons animate iconColor="grey" style={{ width: 64, height: 64 }} icon={props.image} />
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
