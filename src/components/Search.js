import React from 'react';
import { Form, Input, Icon } from 'semantic-ui-react';
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
        search: '',
        loaded: false,
        results: [],
      });
    }
  }

  searchforLocation = () => {
    if (this.state.search.length > 1) {
      this.fetchLocationFrag();
    }
  };

  fetchLocationFrag = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        this.state.search
      }.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&autocomplete=true`,
    )
      .then(res => res.json())
      .then(json => this.setState({ results: json.features.slice(0, 5) }));
  };

  fetchSearchLocation = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        this.state.search
      }.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A`,
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
    this.setState({ search: event.target.value }, _.debounce(this.searchforLocation, 200));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState(this.fetchSearchLocation);
  };

  returnList = () => {
    if (this.state.loaded === false) {
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
            <Input
              icon
              placeholder="Search..."
              onChange={this.handleChange}
              value={this.state.search}
            >
              <input />
              <Icon name="search" />
            </Input>
          </Form.Field>
        </Form>
        {this.returnList()}
      </div>
    );
  }
}

export default Search;
