const initialLocationState = {
  locationName: '',
  coords: [],
  results: [],
  loading: false,
  error: false,
};

const locationReducer = (previousState = initialLocationState, action) => {
  switch (action.type) {
    case 'SET_RESULTS':
      return { ...previousState, results: action.results };
    case 'SAVE_LOCATION':
      return {
        ...previousState,
        locationName: action.name,
        coords: action.coords,
        loading: false,
        error: false,
        results: [],
      };
    case 'LOADING':
      return { ...previousState, loading: true };
    case 'ERROR':
      return {
        ...previousState,
        results: [],
        loading: false,
        error: true,
      };
    case 'CLEAR':
      return { ...previousState, results: [] };
    default:
      return previousState;
  }
};

export default locationReducer;
