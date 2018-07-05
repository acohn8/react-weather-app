import React from 'react';
import { List } from 'semantic-ui-react';

class ListExampleHeader extends React.Component {
  handleClick = (event, data) => {
    this.props.select(data.result.id);
  };
  render() {
    console.log(this.props.results);
    return (
      <List selection>
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
              <List.Description>
                {result.place_name
                  .split(',')
                  .filter(place => place !== result.text)
                  .join(', ')}
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}

export default ListExampleHeader;
