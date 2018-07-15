import axios from 'axios';

const fetchLocation = (term, submit) => (dispatch) => {
  if (term.length > 0) {
    axios
      .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${term}.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us`)
      .then(res =>
        (submit === true
          ? dispatch(saveLocation(res.data))
          : dispatch({ type: 'SET_RESULTS', results: res.data.features.slice(0, 5) })));
  }
  dispatch({ type: 'SET_RESULTS', results: [], text: '' });
};

const geoLocate = () => (dispatch) => {
  dispatch({ type: 'LOADING' });
  navigator.geolocation.getCurrentPosition((position) => {
    const coords = `${position.coords.longitude}, ${position.coords.latitude}`;
    dispatch(fetchLocation(coords, true));
  });
};

const saveLocation = (location) => {
  if (location.features.length > 0) {
    return {
      type: 'SAVE_LOCATION',
      name: location.features['0'].text,
      coords: location.features['0'].center,
    };
  }
  return { type: 'ERROR' };
};

export { geoLocate, fetchLocation };
