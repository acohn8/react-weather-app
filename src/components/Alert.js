import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';

const colors = {
  advisory: 'yellow',
  watch: 'orange',
  warning: 'red',
};

const Alert = ({ alert }) => (
  <Popup
    trigger={<Icon name="exclamation triangle" size="small" color={colors[alert.severity]} />}
    header={alert.title}
    content={alert.description}
    position="bottom right"
    wide="very"
    hideOnScroll
  />
);

export default Alert;
