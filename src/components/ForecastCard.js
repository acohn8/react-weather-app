import React from 'react';
import { Card, Icon, Image, Statistic } from 'semantic-ui-react';

import moment from 'moment';

const ForecastCard = (props) => {
  const date = new Date(props.data.time * 1000);
  return (
    <Card>
      <Card.Content>
        <Card.Header>{moment(date).format('ddd MMMM D')}</Card.Header>
        <Card.Meta>{props.data.summary}</Card.Meta>
        <Statistic.Group horizontal size="mini">
          <Statistic color="orange">
            <Statistic.Value>{Math.round(props.data.high)}</Statistic.Value>
            <Statistic.Label>High</Statistic.Label>
          </Statistic>
          <Statistic color="blue">
            <Statistic.Value>{Math.round(props.data.low)}</Statistic.Value>
            <Statistic.Label>low</Statistic.Label>
          </Statistic>
          <Statistic color="teal">
            <Statistic.Value>{`${Math.round(props.data.humidity * 100)}%`}</Statistic.Value>
            <Statistic.Label>Humidity</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Card.Content>
    </Card>
  );
};

export default ForecastCard;
