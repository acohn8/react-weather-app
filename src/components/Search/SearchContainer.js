import React from 'react';
import { List, Segment, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { fetchLocation, clearList } from '../../redux/actions/locationActions';
import Error from '../Error';
import Search from './SearchBar';
import SearchResults from './SearchResults';

class SearchContainer extends React.Component {
  state = { searchTerm: '' };

  setSearch = e => {
    this.setState(
      { searchTerm: e.target.value },
      () =>
        this.state.searchTerm.length > 0
          ? this.props.fetchLocation(this.state.searchTerm, false)
          : this.props.clearList(),
    );
  };

  render() {
    return (
      <Segment basic>
        {this.props.error === true && <Error />}
        <Form onSubmit={() => this.props.fetchLocation(this.state.searchTerm, true)}>
          <Form.Field>
            <Search setSearch={this.setSearch} searchTerm={this.state.searchTerm} />
          </Form.Field>
        </Form>
        {this.props.results.length > 0 && (
          <List selection>
            {this.props.results.map(result => <SearchResults key={result.id} result={result} />)}
          </List>
        )}
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  results: state.location.results,
  error: state.location.error,
});

const mapDispatchToProps = dispatch => ({
  fetchLocation: (location, submit) => dispatch(fetchLocation(location, submit)),
  clearList: () => dispatch(clearList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);
