import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';

const colors = {
  advisory: 'yellow',
  watch: 'orange',
  warning: 'red',
};

const Alert = props => (
  <div>
    {props.alerts.map(alert => (
      <Popup
        trigger={<Icon circular name="warning circle" color={colors[alert.severity]} />}
        key={alert.index}
        header={alert.title}
        content={alert.description}
        position="bottom center"
        wide="very"
      />
    ))}
  </div>
);

export default Alert;
