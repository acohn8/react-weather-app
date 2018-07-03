import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorMessage = () => (
  <Message negative>
    <Message.Header>No data available.</Message.Header>
    <p>Please search again.</p>
  </Message>
);

export default ErrorMessage;
