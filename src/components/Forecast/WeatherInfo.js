import React from 'react';
import { Divider, Header, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';

import CityHeader from './Header';
import ForecastCard from './ForecastCard';
import TodayAndTomorrow from './TodayAndTomorrow';
import ForecastLoader from '../Loader';
import { getWeather } from '../../redux/actions/weatherActions';

class WeatherInfo extends React.Component {
  componentDidMount() {
    this.props.getWeather(this.props.coords);
  }

  componentDidUpdate(prevProps) {
    if (this.props.coords !== prevProps.coords) {
      this.props.getWeather(this.props.coords);
    }
  }

  render() {
    return (
      <div>
        {this.props.loading === true && <ForecastLoader />}
        {this.props.loading === false && (
          <div>
            <CityHeader />
            <Divider section />
            <TodayAndTomorrow forecast={this.props.forecast.hourly} />
            <Divider section />
            <Header size="large">
              This Week
              <Header.Subheader>{this.props.forecast.daily.summary}</Header.Subheader>
            </Header>
            <Card.Group stackable itemsPerRow={4}>
              {this.props.forecast.daily.data.map(day => <ForecastCard key={day.time} day={day} />)}
            </Card.Group>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getWeather: coords => dispatch(getWeather(coords)),
});

const mapStateToProps = state => ({
  coords: state.location.coords,
  forecast: state.weather.forecast,
  loading: state.weather.loading,
  alerts: state.weather.alerts,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeatherInfo);
