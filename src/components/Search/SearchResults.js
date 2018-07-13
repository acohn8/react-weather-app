import React from 'react';
import { List } from 'semantic-ui-react';

const ListExampleHeader = ({ result, select }) => (
  <List.Item onClick={() => select(result)}>
    <List.Icon name="map marker alternate" size="large" verticalAlign="middle" color="blue" />
    <List.Content>
      <List.Header>{result.text}</List.Header>
      <List.Description>
        {result.place_name
          .split(',')
          .filter(place => place !== result.text)
          .join(', ')}
      </List.Description>
    </List.Content>
  </List.Item>
);

export default ListExampleHeader;
