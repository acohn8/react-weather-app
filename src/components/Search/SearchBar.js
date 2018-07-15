import React from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { fetchLocation, geoLocate } from '../../redux/actions';

const Search = props =>
  (props.loading === false ? (
    <Input
      icon
      placeholder="Search..."
      value={props.searchTerm}
      onChange={e => props.fetchLocation(e.target.value, false)}
    >
      <input />
      <Icon name="location arrow" color="olive" inverted circular link onClick={props.geoLocate} />
    </Input>
  ) : (
    <Input loading icon="user" placeholder="Search..." />
  ));

const mapStateToProps = state => ({ loading: state.loading, searchTerm: state.searchTerm });

const mapDispatchToProps = dispatch => ({
  fetchLocation: (term, submit) => dispatch(fetchLocation(term, submit)),
  geoLocate: () => dispatch(geoLocate()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
