import axios from 'axios';

const getWeather = coords => (dispatch) => {
  dispatch({ type: 'LOADING' });
  axios
    .get(`https://cryptic-headland-94862.herokuapp.com/https://api.darksky.net/forecast/1114b767335760c2ae618d019fe72dd0/${
      coords[1]
    },${coords[0]}`)
    .then(weather => dispatch(setWeather(weather.data)));
};

const setWeather = (weather) => {
  const currentWeather = weather.currently;
  const dailyWeather = weather.daily;
  const hourlyWeather = weather.hourly;
  let currentAlerts;
  weather.alerts !== undefined ? (currentAlerts = weather.alerts) : (currentAlerts = []);
  return {
    type: 'SET_WEATHER',
    forecast: { daily: dailyWeather, current: currentWeather, hourly: hourlyWeather },
    alerts: currentAlerts,
    loading: false,
  };
};

export { getWeather };
