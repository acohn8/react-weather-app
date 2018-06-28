import React from 'react';
import { Form } from 'semantic-ui-react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: '' };
  }

  handleChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.setCity(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Search For A Location</label>
          <input onChange={this.handleChange} value={this.state.searchValue} />
        </Form.Field>
      </Form>
    );
  }
}

export default Search;
