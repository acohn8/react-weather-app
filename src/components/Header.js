import React from 'react';
import { Header, Grid, Segment } from 'semantic-ui-react';
import Alert from './Alert';
import CurrentOverview from './CurrentOverview';
import WeatherList from './Weatherlist';

class CityHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { details: false };
  }

  handleClick = () => {
    this.setState({ details: !this.state.details });
  };

  render() {
    return (
      <Segment basic>
        <Grid.Row>
          <Header size="large">
            Now
            <Header.Subheader>{this.props.weather.conditions}</Header.Subheader>
            {this.props.alerts.length > 0 ? (
              <Segment basic>
                <Alert alerts={this.props.alerts} />
              </Segment>
            ) : (
              ''
            )}
          </Header>
        </Grid.Row>
        <CurrentOverview weather={this.props.weather} alerts={this.props.alerts} />
        <WeatherList weather={this.props.weather} />
      </Segment>
    );
  }
}

export default CityHeader;
