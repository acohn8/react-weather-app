import React from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { geoLocate } from '../../redux/actions/locationActions';

const Search = ({ searchTerm, setSearch }) => (
  <Input icon placeholder="Search..." value={searchTerm} onChange={setSearch}>
    <input />
    <Icon name="location arrow" color="olive" inverted circular link onClick={geoLocate} />
  </Input>
);

const mapDispatchToProps = dispatch => ({
  geoLocate: () => dispatch(geoLocate()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Search);
