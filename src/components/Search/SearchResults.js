import React from 'react';
import { List } from 'semantic-ui-react';
import { fetchLocation } from '../../redux/actions/locationActions';
import { connect } from 'react-redux';

const ListExampleHeader = ({ result, fetchLocation }) => (
  <List.Item onClick={() => fetchLocation(result.id, true)}>
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

const mapDispatchToProps = dispatch => ({
  fetchLocation: (location, submit) => dispatch(fetchLocation(location, submit)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ListExampleHeader);
