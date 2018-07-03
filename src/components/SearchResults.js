import React from 'react';
import { List } from 'semantic-ui-react';

class ListExampleHeader extends React.Component {
  handleClick = (event, data) => {
    this.props.select(data.result.id);
  };

  render() {
    return (
      <List selection verticalAlign="middle divided relaxed">
        {this.props.results.map(result => (
          <List.Item key={result.id} onClick={this.handleClick} result={result}>
            <List.Icon
              name="map marker alternate"
              size="large"
              verticalAlign="middle"
              color="blue"
            />
            <List.Content>
              <List.Header>{result.text}</List.Header>
              <List.Description>{result.matching_place_name}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}

export default ListExampleHeader;
