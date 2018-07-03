import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const LocateIcon = props => (
  <Icon name="location arrow" inverted circular link color="blue" onClick={props.handleGeolocate} />
);

export default LocateIcon;
