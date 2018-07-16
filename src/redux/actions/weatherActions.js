import axios from 'axios';

const setWeather = weather => ({
  type: 'SET_WEATHER',
  forecast: { daily: weather.daily, current: weather.currently, hourly: weather.hourly },
  alerts: weather.alerts !== undefined ? weather.alerts : [],
  loading: false,
});

const getWeather = coords => (dispatch) => {
  dispatch({ type: 'GET_WEATHER' });
  return axios
    .get(`https://cryptic-headland-94862.herokuapp.com/https://api.darksky.net/forecast/1114b767335760c2ae618d019fe72dd0/${
      coords[1]
    },${coords[0]}`)
    .then(weather => dispatch(setWeather(weather.data)));
};

export { getWeather };
