const getLocation = location =>
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us`).then(res => res.json());

const geoLocate = () => (dispatch) => {
  dispatch({ type: 'LOADING' });
  navigator.geolocation.getCurrentPosition(position =>
    getLocation(`${position.coords.longitude}, ${position.coords.latitude}`).then(json =>
      dispatch(saveLocation(json))));
};

const submitLocation = location => (dispatch) => {
  dispatch({ type: 'LOADING' });
  getLocation(location).then(json => dispatch(saveLocation(json)));
};

const createResultsList = search => (dispatch) => {
  if (search.length > 0) {
    getLocation(search).then(json =>
      dispatch({ type: 'SET_RESULTS', results: json.features.slice(0, 5) }));
  } else {
    dispatch({ type: 'SET_RESULTS', results: [], text: '' });
  }
};

const saveLocation = location => ({
  type: 'SAVE_LOCATION',
  name: location.features['0'].text,
  coords: location.features['0'].center,
});

export { geoLocate, submitLocation, createResultsList };
