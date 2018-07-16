import React from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { geoLocate } from '../../redux/actions/locationActions';

const Search = ({
  searchTerm, setSearch, geoLocate, loading,
}) =>
  (loading === false ? (
    <Input icon placeholder="Search..." value={searchTerm} onChange={setSearch}>
      <input />
      <Icon name="location arrow" color="olive" inverted circular link onClick={geoLocate} />
    </Input>
  ) : (
    <Input loading icon="user" placeholder="Search..." />
  ));

const mapStateToProps = state => ({
  loading: state.location.loading,
});

const mapDispatchToProps = dispatch => ({
  geoLocate: () => dispatch(geoLocate()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
