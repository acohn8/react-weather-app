import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';

export default class Nav extends Component {
  render() {
    return (
      <Segment inverted color="blue">
        <Menu inverted secondary color="blue">
          <Menu.Item as="h2" name="Weather" />
        </Menu>
      </Segment>
    );
  }
}
