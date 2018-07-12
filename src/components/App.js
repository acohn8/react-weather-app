import { Grid, Container, Divider, List, Segment, Form, Input } from 'semantic-ui-react';
import _ from 'lodash';

import React from 'react';
import Nav from './Nav';
import Search from './Search';
import WeatherInfo from './WeatherInfo';
import Error from './Error';
import SearchResults from './SearchResults';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: [],
      location: { name: '', coords: [] },
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
      this.setState({ results: [] });
    }
  };

  completeLoad = json => {
    if (json.features.length > 0) {
      this.setState({
        location: { name: json.features['0'].text, coords: json.features['0'].center },
        results: [],
        loading: false,
        submitted: false,
        error: false,
      });
    } else {
      this.setState({ error: true, loading: false });
    }
  };

  setLocation = response => {
    this.setState({
      location: {
        name: response.features[0].text,
        coords: response.features[0].center,
      },
    });
  };

  setSearch = term => {
    this.setState({ search: term }, _.debounce(this.fetchSearchLocation, 200));
  };

  getLocationFromList = result => {
    this.setState({ search: result.id, loading: true, submitted: true }, this.fetchSearchLocation);
  };

  handleSubmit = () => {
    this.setState({ loading: true, submitted: true }, this.fetchSearchLocation);
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
        <Nav location={this.state.location.name} />
        <Container style={{ marginTop: '3em' }}>
          <Grid stackable centered relaxed>
            <Grid.Column>
              <Segment basic>
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
                    <SearchResults
                      key={result.id}
                      result={result}
                      select={this.getLocationFromList}
                    />
                  ))}
                </List>
              )}
              <Grid.Row>
                {this.state.error === true && <Error />}
                {this.state.location.coords.length === 2 && (
                  <WeatherInfo location={this.state.location} />
                )}
              </Grid.Row>
              <Divider section hidden />
              <Footer />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
