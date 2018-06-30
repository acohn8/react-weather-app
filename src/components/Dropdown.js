import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

const dateOptions = [
  { key: 'd', text: 'Day', value: 'daily' },
  { key: 'h', text: 'Hour', value: 'hourly' },
  { key: 'm', text: 'Minute', value: 'minutely' },
];

class ForecastForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', options: [] };
  }

  handleChange = (e, { value }) => {
    if (value !== '') {
      this.setState({ value: value }, this.setDropdownData);
    }
  };

  setDropdownData = () => {
    let counter = 0;
    const forecastType = this.state.value;
    const dataToRender = this.props.options[forecastType];
    const options = [];
    Object.keys(dataToRender).forEach(dataPoint => {
      options.push({ key: counter, text: dataPoint, value: dataPoint });
      counter += 1;
    });
    this.setState({ options: options });
  };

  setFilter = (e, { value }) => {
    this.props.filter(this.state.value, value);
  };

  render() {
    const { value } = this.state;
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
          <Form.Select
            fluid
            label="Data to graph"
            options={this.state.options}
            placeholder="Data"
            onChange={this.setFilter}
          />
        </Form.Group>
      </Form>
    );
  }
}

export default ForecastForm;
