import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import Error from './Error';
import BarChart from './Forecast';
import { Divider } from 'semantic-ui-react';

const CityWeather = (props) => {
  const weather = props.weather;
  if (props.status === 404) {
    return <Error />;
  } else if (props.status === '') {
    return '';
  }
  return (
    <div>
      <Divider />
      <Card fluid>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src={`http://openweathermap.org/img/w/${weather.imageId}.png`}
          />
          <Card.Header>{weather.nameToDisplay}</Card.Header>
          <Card.Meta>
            {`Currently: ${weather.conditions} and ${Math.round(weather.tempreture)} degrees`}
          </Card.Meta>
          <Card.Description>
            {`Today, the high is ${Math.round(weather.high)} degrees and the low is ${Math.round(weather.low)} degrees.`}
          </Card.Description>
        </Card.Content>
        <Card.Content extra onClick={props.forecast}>
          Forecast
        </Card.Content>
      </Card>
      {props.forecastData.forecastDates.length > 0 ? <BarChart data={props.forecastData} /> : ''}
    </div>
  );
};

export default CityWeather;
