import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

const Nav = props => (
  <Menu icon inverted color="blue" fixed="top">
    <Menu.Item name="sun">
      <Icon name="sun" />
    </Menu.Item>
    {props.location === '' ? (
      <Menu.Item name="Find Your Weather" />
    ) : (
      <Menu.Item name={props.location} />
    )}
  </Menu>
);

export default Nav;
