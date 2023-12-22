import { combineReducers } from 'redux';

const initialState = {
  data: [],
  contries: {
    destination: '',
    arrival: ''
  },
  selectedAirline: null
};

const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RESULT':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COUNTRIES':
      return {
        ...state,
        contries: action.payload,
      };
    default:
      return state;
  }
};

const airlineReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_AIRLINE':
      return {
        ...state,
        selectedAirline: action.payload,
      };
    default:
      return state;
  }
};
// Combine the individual reducers into a root reducer
const rootReducer = combineReducers({
  results: resultReducer,
  contries: countryReducer,
  airlines: airlineReducer
});

export default rootReducer;