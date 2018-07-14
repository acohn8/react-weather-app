const initialLocationState = {
  searchTerm: '',
  locationName: '',
  coords: [],
  results: [],
  loading: false,
  error: false,
};

const locationReducer = (previousState = initialLocationState, action) => {
  switch (action.type) {
    case 'SET_RESULTS':
      return { ...initialLocationState, results: action.results, searchTerm: action.text };
    case 'SAVE_LOCATION':
      return {
        ...initialLocationState,
        locationName: action.name,
        coords: action.coords,
        loading: false,
        error: false,
      };
    case 'LOADING':
      return { ...initialLocationState, loading: true };
    case 'ERROR':
      return {
        ...initialLocationState,
        searchTerm: '',
        results: [],
        loading: false,
        error: true,
      };
    default:
      return previousState;
  }
};

export default locationReducer;
