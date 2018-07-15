import React from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { createResultsList, geoLocate } from '../../redux/actions';

const Search = props =>
  (props.loading === false ? (
    <Input icon placeholder="Search..." onChange={e => props.createResultsList(e.target.value)}>
      <input />
      <Icon name="location arrow" color="olive" inverted circular link onClick={props.geoLocate} />
    </Input>
  ) : (
    <Input loading icon="user" placeholder="Search..." />
  ));

const mapStateToProps = state => ({ loading: state.loading });

const mapDispatchToProps = dispatch => ({
  createResultsList: term => dispatch(createResultsList(term)),
  geoLocate: () => dispatch(geoLocate()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
