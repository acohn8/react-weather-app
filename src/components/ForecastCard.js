import React from 'react';
import { Card, List } from 'semantic-ui-react';

import moment from 'moment';

const ForecastCard = ({ day }) => (
  <Card>
    <Card.Content>
      <Card.Header>{moment(new Date(day.time * 1000)).format('ddd MMMM D')}</Card.Header>
      <Card.Meta style={{ minHeight: 20 }}>{day.summary}</Card.Meta>
      <List relaxed>
        <List.Item>
          <List.Icon
            name="thermometer three quarters"
            size="large"
            verticalAlign="middle"
            color="grey"
          />
          <List.Content>
            <List.Header>{Math.round(day.temperatureHigh)}</List.Header>
            <List.Description>High</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="thermometer empty" size="large" verticalAlign="middle" color="grey" />
          <List.Content>
            <List.Header>{Math.round(day.temperatureLow)}</List.Header>
            <List.Description>Low</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="rain" size="large" verticalAlign="middle" color="grey" />
          <List.Content>
            <List.Header>{`${Math.round(day.precipProbability * 100)}`}%</List.Header>
            <List.Description>Precipitation Chance</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="shower" size="large" verticalAlign="middle" color="grey" />
          <List.Content>
            <List.Header>{`${Math.round(day.humidity * 100)}`}%</List.Header>
            <List.Description>Humidity</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="flag" size="large" verticalAlign="middle" color="grey" />
          <List.Content>
            <List.Header>{Math.round(day.windSpeed)} MPH</List.Header>
            <List.Description>Wind</List.Description>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

export default ForecastCard;
