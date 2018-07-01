import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

const Nav = () => (
  <Menu icon>
    <Menu.Item name="sun">
      <Icon name="sun" />
    </Menu.Item>
    <Menu.Item name="Find Your Weather" />
  </Menu>
);

export default Nav;
