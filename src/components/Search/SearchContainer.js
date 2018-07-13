import { List, Segment, Form, Input } from 'semantic-ui-react';
import _ from 'lodash';

import React from 'react';
import Search from './SearchBar';
import SearchResults from './SearchResults';
import Error from '../Error';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: [],
      error: false,
      submitted: false,
    };
  }

  fetchSearchLocation = () => {
    if (this.state.search.length > 0) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          this.state.search
        }.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us`,
      )
        .then(res => res.json())
        .then(
          json =>
            this.state.submitted === false
              ? this.setState({ results: json.features.slice(0, 5) })
              : this.completeLoad(json),
        );
    } else {
      this.setState({ results: [], search: '' });
    }
  };

  completeLoad = json => {
    if (json.features.length > 0) {
      this.setState(
        {
          results: [],
          loading: false,
          error: false,
          submitted: false,
          search: '',
        },
        () => this.props.saveLocation(json.features['0'].text, json.features['0'].center),
      );
    } else {
      this.setState({ error: true, loading: false });
    }
  };

  setSearch = term => {
    this.setState({ search: term }, _.debounce(this.fetchSearchLocation, 200));
  };

  getLocationFromList = result => {
    this.setState({ search: result.id, loading: true, submitted: true }, this.fetchSearchLocation);
  };

  handleSubmit = () => {
    this.setState({ loading: true, submitted: true, results: [] }, this.fetchSearchLocation);
  };

  geoLocate = () => {
    this.setState({ loading: true }, () => {
      navigator.geolocation.getCurrentPosition(position =>
        this.setState(
          { search: `${position.coords.longitude}, ${position.coords.latitude}`, submitted: true },
          this.fetchSearchLocation,
        ),
      );
    });
  };

  render() {
    return (
      <div>
        <Segment basic>
          {this.state.error === true && <Error />}
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              {this.state.loading === true ? (
                <Input loading placeholder="Search..." />
              ) : (
                <Search setSearch={this.setSearch} geoLocate={this.geoLocate} />
              )}
            </Form.Field>
          </Form>
        </Segment>
        {this.state.results.length > 0 && (
          <List selection>
            {this.state.results.map(result => (
              <SearchResults key={result.id} result={result} select={this.getLocationFromList} />
            ))}
          </List>
        )}
      </div>
    );
  }
}

export default SearchContainer;
