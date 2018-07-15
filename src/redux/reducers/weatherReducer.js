const initialWeatherState = {
  alerts: [],
  forecast: {},
  loading: true,
};

const weatherReducer = (previousState = initialWeatherState, action) => {
  switch (action.type) {
    case 'SET_WEATHER':
      return {
        ...previousState,
        alerts: action.alerts,
        forecast: action.forecast,
        loading: false,
      };
    case 'LOADING':
      return { ...previousState, loading: true };
    default:
      return previousState;
  }
};

export default weatherReducer;
