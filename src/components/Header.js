import React from 'react';
import { Header, Grid, Button, Segment } from 'semantic-ui-react';
import CurrentDetail from './CurrentDetail';
import Alert from './Alert';
import CurrentOverview from './CurrentOverview';

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
            <Segment basic>
              {this.props.alerts.length > 0 ? <Alert alerts={this.props.alerts} /> : ''}
            </Segment>
          </Header>
        </Grid.Row>
        {this.state.details === false ? (
          <CurrentOverview weather={this.props.weather} alerts={this.props.alerts} />
        ) : (
          <CurrentDetail weather={this.props.weather} />
        )}
        <Button onClick={this.handleClick} primary>
          {this.state.details === false ? 'Details' : 'Overview'}
        </Button>
      </Segment>
    );
  }
}

export default CityHeader;
