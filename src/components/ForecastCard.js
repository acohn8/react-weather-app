import React from 'react';
import { Card, List } from 'semantic-ui-react';

import moment from 'moment';

const ForecastCard = (props) => {
  const date = new Date(props.data.time * 1000);
  return (
    <Card>
      <Card.Content>
        <Card.Header>{moment(date).format('ddd MMMM D')}</Card.Header>
        <Card.Meta style={{ minHeight: 20 }}>{props.data.summary}</Card.Meta>
        <List relaxed>
          <List.Item>
            <List.Icon
              name="thermometer three quarters"
              size="large"
              verticalAlign="middle"
              color="grey"
            />
            <List.Content>
              <List.Header>{Math.round(props.data.high)}</List.Header>
              <List.Description>High</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="thermometer empty" size="large" verticalAlign="middle" color="grey" />
            <List.Content>
              <List.Header>{Math.round(props.data.low)}</List.Header>
              <List.Description>Low</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="shower" size="large" verticalAlign="middle" color="grey" />
            <List.Content>
              <List.Header>{`${Math.round(props.data.humidity * 100)}`}%</List.Header>
              <List.Description>Humidity</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="flag" size="large" verticalAlign="middle" color="grey" />
            <List.Content>
              <List.Header>{Math.round(props.data.wind)} MPH</List.Header>
              <List.Description>Wind</List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  );
};

export default ForecastCard;
