import React from 'react';
import { connect } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';

const Nav = props => (
  <Menu icon inverted color="blue" fixed="top">
    <Menu.Item name="sun">
      <Icon name="sun" />
    </Menu.Item>
    {props.locationName === '' ? (
      <Menu.Item name="Find Your Weather" />
    ) : (
      <Menu.Item name={props.locationName} />
    )}
  </Menu>
);

const mapStateToProps = state => ({ locationName: state.locationName });

export default connect(mapStateToProps)(Nav);
