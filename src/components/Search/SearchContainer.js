import React from 'react';
import { List, Segment, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveLocation } from '../../redux/actions';

import Error from '../Error';
import Search from './SearchBar';
import SearchResults from './SearchResults';

const SearchContainer = props => (
  <Segment basic>
    {props.error === true && <Error />}
    <Form onSubmit={() => props.saveLocation(props.searchTerm)}>
      <Form.Field>
        <Search />
      </Form.Field>
    </Form>
    {props.results.length > 0 && (
      <List selection>
        {props.results.map(result => <SearchResults key={result.id} result={result} />)}
      </List>
    )}
  </Segment>
);

const mapStateToProps = state => ({
  results: state.results,
  searchTerm: state.searchTerm,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  saveLocation: location => dispatch(saveLocation(location)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);
