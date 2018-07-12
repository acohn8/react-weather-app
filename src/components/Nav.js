import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

const Nav = ({ location }) => (
  <Menu icon inverted color="blue" fixed="top">
    <Menu.Item name="sun">
      <Icon name="sun" />
    </Menu.Item>
    {location === '' ? <Menu.Item name="Find Your Weather" /> : <Menu.Item name={location} />}
  </Menu>
);

export default Nav;
