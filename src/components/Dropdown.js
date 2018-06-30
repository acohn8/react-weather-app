import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

const dateOptions = [
  { key: 'd', text: 'Day', value: 'daily' },
  { key: 'h', text: 'Hour', value: 'hourly' },
];

class ForecastForm extends Component {
  handleChange = (e, { value }) => {
    if (value !== '') {
      this.props.filter(value);
    }
  };

  render() {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Forecast"
            options={dateOptions}
            placeholder="Timespan"
            onChange={this.handleChange}
          />
        </Form.Group>
      </Form>
    );
  }
}

export default ForecastForm;
