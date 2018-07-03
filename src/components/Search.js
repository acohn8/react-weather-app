import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import _ from 'lodash';
import SearchResults from './SearchResults';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: [],
      loaded: false,
    };
  }

  componentDidUpdate() {
    if (this.state.loaded === true) {
      this.setState({
        searchTerm: '',
        loaded: false,
        results: [],
      });
    }
  }

  searchforLocation = () => {
    if (this.state.search.length > 0) {
      this.fetchLocationFrag(this.state.search);
    }
  };

  fetchLocationFrag = search => {
    console.log(search);
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&autocomplete=true`,
    )
      .then(res => res.json())
      .then(json => this.setState({ results: json.features.slice(0, 5) }));
  };

  fetchSearchLocation = search => {
    console.log(search);
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A`,
    )
      .then(res => res.json())
      .then(geoData => this.props.setLocation(geoData))
      .then(
        this.setState({
          results: [],
          loaded: true,
        }),
      );
  };

  handleChange = event => {
    this.setState({ search: event.target.value }, this.searchforLocation(this.state.search));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loaded: true }, this.fetchSearchLocation(this.state.search));
  };

  returnList = () => {
    if (this.state.loaded === false || this.state.results === []) {
      return (
        <div>
          <SearchResults results={this.state.results} select={this.fetchSearchLocation} />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Search for a location</label>
            <Input
              onChange={this.handleChange}
              icon="search"
              placeholder="Search..."
              value={this.state.search}
            />
          </Form.Field>
        </Form>
        {this.returnList()}
      </div>
    );
  }
}

export default Search;
