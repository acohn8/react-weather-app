import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
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
    console.log(this.props);
    return (
      <div>
        <Header size="large">
          Now
          <Header.Subheader>
            {this.props.currentWeather.summary}
            {this.props.alerts.length > 0 ? <Alert alerts={this.props.alerts} /> : ''}
          </Header.Subheader>
        </Header>
        <Grid columns={4} centered relaxed>
          <Grid.Column>
            <CurrentOverview weather={this.props.currentWeather} />
          </Grid.Column>
        </Grid>
        <WeatherList weather={this.props.dailyWeather} />
      </div>
    );
  }
}

export default CityHeader;
