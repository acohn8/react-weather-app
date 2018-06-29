import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';

const Nav = props => (
  <Segment inverted color="blue">
    <Menu inverted secondary color="blue">
      <Menu.Item as="h1" name={props.city ? props.city : 'Search for a city'} />
    </Menu>
  </Segment>
);
export default Nav;
