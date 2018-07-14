const fetchLocation = term => (dispatch) => {
  if (term.length > 0) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${term}.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us`)
      .then(res => res.json())
      .then(json =>
        dispatch({ type: 'SET_RESULTS', text: term, results: json.features.slice(0, 5) }));
  } else {
    dispatch({ type: 'SET_RESULTS', results: [], text: '' });
  }
};

const saveLocation = location => (dispatch) => {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us`)
    .then(dispatch({ type: 'LOADING' }))
    .then(res => res.json())
    .then(json =>
      (json.features.length > 0
        ? dispatch({
          type: 'SAVE_LOCATION',
          name: json.features['0'].text,
          coords: json.features['0'].center,
        })
        : dispatch({ type: 'ERROR' })));
};

export { fetchLocation, saveLocation };
