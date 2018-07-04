import React from 'react';
import { List, Accordion, Icon } from 'semantic-ui-react';
import moment from 'moment';

class WeatherList extends React.Component {
  state = { activeIndex: 1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const weather = this.props.weather;
    const { activeIndex } = this.state;
    const sunrise = new Date(weather.sunrise * 1000);
    const sunset = new Date(weather.sunset * 1000);
    return (
      <Accordion styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name="dropdown" />
          Details
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <List relaxed>
            <List.Item>
              <List.Icon name="thermometer three quarters" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">{Math.round(weather.high)}</List.Header>
                <List.Description as="a">High</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="thermometer empty" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">{Math.round(weather.low)}</List.Header>
                <List.Description as="a">Low</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="shower" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">{`${Math.round(weather.humidity * 100)}`}%</List.Header>
                <List.Description as="a">Humidity</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="flag" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">{weather.wind} MPH</List.Header>
                <List.Description as="a">Wind</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="sun" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">{moment(sunrise).format('h:mm A')}</List.Header>
                <List.Description as="a">Sunrise</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="moon" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">{moment(sunset).format('h:mm A')}</List.Header>
                <List.Description as="a">Sunset</List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default WeatherList;
