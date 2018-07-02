import React from 'react';
import { Form, Input, Icon } from 'semantic-ui-react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: '', loading: false };
  }

  componentWillUpdate(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ loading: false });
    }
  }

  handleChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleClick = () => {
    this.setState({ loading: true }, this.props.locate());
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.getLocation(this.state.searchValue);
  };

  handleLoading = () => {
    if (this.state.loading === true) {
      return <Input loading placeholder="Search..." />;
    } else {
      return (
        <Input
          onChange={this.handleChange}
          icon={
            <Icon
              name="location arrow"
              color="blue"
              inverted
              circular
              link
              value={this.state.searchValue}
              onClick={this.handleClick}
            />
          }
          placeholder="Search..."
        />
      );
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Search for a location</label>
          {this.handleLoading()}
        </Form.Field>
      </Form>
    );
  }
}

export default Search;
