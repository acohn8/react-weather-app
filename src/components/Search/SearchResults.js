import React from 'react';
import { List } from 'semantic-ui-react';
import { submitLocation } from '../../redux/actions';
import { connect } from 'react-redux';

const ListExampleHeader = props => (
  <List.Item onClick={() => props.submitLocation(props.result.id)}>
    <List.Icon name="map marker alternate" size="large" verticalAlign="middle" color="blue" />
    <List.Content>
      <List.Header>{props.result.text}</List.Header>
      <List.Description>
        {props.result.place_name
          .split(',')
          .filter(place => place !== props.result.text)
          .join(', ')}
      </List.Description>
    </List.Content>
  </List.Item>
);

const mapDispatchToProps = dispatch => ({
  submitLocation: location => dispatch(submitLocation(location)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ListExampleHeader);
