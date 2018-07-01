import React from 'react';
import { Button, Popup, Icon } from 'semantic-ui-react';

const colors = {
  advisory: 'yellow',
  watch: 'orange',
  warning: 'red',
};

const Alert = props => (
  <div>
    {props.alerts.map(alert => (
      <Popup
        trigger={<Button icon="warning circle" color={colors[alert.severity]} />}
        header={alert.severity}
        content={alert.title}
      />
    ))}
  </div>
);

export default Alert;
