import React from 'react';
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';

const Nav = ({ locationName }) => (
  <Menu icon inverted color="blue" fixed="top">
    <Menu.Item name="sun">
      <Icon name="sun" />
    </Menu.Item>
    {locationName === '' ? (
      <Menu.Item name="Find Your Weather" />
    ) : (
      <Menu.Item name={locationName} />
    )}
  </Menu>
);

const mapStateToProps = state => ({ locationName: state.location.locationName });

export default connect(mapStateToProps)(Nav);
