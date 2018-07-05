import React from 'react';
import { List, Grid } from 'semantic-ui-react';
import moment from 'moment';

const WeatherList = ({ weather }) => {
  const sunrise = new Date(weather.sunrise * 1000);
  const sunset = new Date(weather.sunset * 1000);
  return (
    <Grid columns={4} centered relaxed>
      <Grid.Row>
        <List relaxed horizontal>
          <List.Item>
            <List.Icon
              name="thermometer three quarters"
              size="large"
              verticalAlign="middle"
              color="grey"
            />
            <List.Content>
              <List.Header>{Math.round(weather.high)}</List.Header>
              <List.Description>High</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="thermometer empty" size="large" verticalAlign="middle" color="grey" />
            <List.Content>
              <List.Header>{Math.round(weather.low)}</List.Header>
              <List.Description>Low</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="shower" size="large" verticalAlign="middle" color="grey" />
            <List.Content>
              <List.Header>{`${Math.round(weather.humidity * 100)}`}%</List.Header>
              <List.Description>Humidity</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Grid.Row>
      <Grid.Row>
        <List relaxed horizontal>
          <List.Item>
            <List.Icon name="flag" size="large" verticalAlign="middle" color="grey" />
            <List.Content>
              <List.Header>{Math.round(weather.wind)} MPH</List.Header>
              <List.Description>Wind</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="sun" size="large" verticalAlign="middle" color="grey" />
            <List.Content>
              <List.Header>{moment(sunrise).format('h:mm')}</List.Header>
              <List.Description>Sunrise</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="moon" size="large" verticalAlign="middle" color="grey" />
            <List.Content>
              <List.Header>{moment(sunset).format('h:mm')}</List.Header>
              <List.Description>Sunset</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Grid.Row>
    </Grid>
  );
};

export default WeatherList;
