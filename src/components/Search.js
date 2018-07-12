import React from 'react';
import { Input, Icon } from 'semantic-ui-react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  handleChange = event => {
    this.setState({ search: event.target.value }, () => this.props.setSearch(this.state.search));
  };

  render() {
    return (
      <Input icon placeholder="Search..." onChange={this.handleChange} value={this.state.search}>
        <input />
        <Icon
          name="location arrow"
          color="olive"
          inverted
          circular
          link
          onClick={this.props.geoLocate}
        />
      </Input>
    );
  }
}

export default Search;
