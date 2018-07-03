import React from 'react';
import { Feed, Grid, Card } from 'semantic-ui-react';
import moment from 'moment';

const CurrentDetail = ({ weather }) => {
  const sunrise = new Date(weather.sunrise * 1000);
  const sunset = new Date(weather.sunset * 1000);

  return (
    <Grid.Row centered columns={4}>
      <Card.Group stackable centered>
        <Card>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Label icon="thermometer three quarters" />
                <Feed.Content>
                  <Feed.Summary>High</Feed.Summary>
                  <Feed.Extra text>{Math.round(weather.high)}</Feed.Extra>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Label icon="thermometer empty" />
                <Feed.Content>
                  <Feed.Summary>Low</Feed.Summary>
                  <Feed.Extra text>{Math.round(weather.low)}</Feed.Extra>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Label icon="shower" />
                <Feed.Content>
                  <Feed.Summary>Humidity</Feed.Summary>
                  <Feed.Extra text>{`${Math.round(weather.humidity * 100)}`}%</Feed.Extra>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Label icon="flag" />
                <Feed.Content>
                  <Feed.Summary>Wind</Feed.Summary>
                  <Feed.Extra text>{weather.wind} MPH</Feed.Extra>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Label icon="rain" />
                <Feed.Content>
                  <Feed.Summary>Precipitation Chance</Feed.Summary>
                  <Feed.Extra text>{`${Math.round(weather.precipChance * 100)}`}%</Feed.Extra>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Label icon="sun outline" />
                <Feed.Content>
                  <Feed.Summary>UV Index</Feed.Summary>
                  <Feed.Extra text>{weather.uvIndex}</Feed.Extra>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Label icon="sun" />
                <Feed.Content>
                  <Feed.Summary>Sunrise</Feed.Summary>
                  <Feed.Extra text>{moment(sunrise).format('h:mm A')}</Feed.Extra>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Label icon="moon" />
                <Feed.Content>
                  <Feed.Summary>Sunset</Feed.Summary>
                  <Feed.Extra text>{moment(sunset).format('h:mm A')}</Feed.Extra>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      </Card.Group>
    </Grid.Row>
  );
};

export default CurrentDetail;
