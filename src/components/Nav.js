import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';

const Nav = () => (
  <Segment inverted color="blue">
    <Menu inverted secondary color="blue">
      <Menu.Item as="h1" name="Search for weather" />
    </Menu>
  </Segment>
);
export default Nav;
