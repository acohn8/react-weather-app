import React from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchLocation, saveLocation } from '../../redux/actions';

const Search = props =>
  (props.loading === false ? (
    <Input icon placeholder="Search..." onChange={e => props.fetchLocation(e.target.value)}>
      <input />
      <Icon
        name="location arrow"
        color="olive"
        inverted
        circular
        link
        onClick={() =>
          props.saveLocation(navigator.geolocation.getCurrentPosition(position => `${position.coords.longitude}, ${position.coords.latitude}`))
        }
      />
    </Input>
  ) : (
    <Input loading icon="user" placeholder="Search..." />
  ));

const mapStateToProps = state => ({ loading: state.loading });

const mapDispatchToProps = dispatch => ({
  fetchLocation: term => dispatch(fetchLocation(term)),
  saveLocation: term => dispatch(saveLocation(term)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
