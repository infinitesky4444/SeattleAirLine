import { combineReducers } from 'redux';

const initialState = {
  data: [],
  contries: {
    destination: '',
    arrival: ''
  },
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
// Combine the individual reducers into a root reducer
const rootReducer = combineReducers({
  results: resultReducer,
  contries: countryReducer,
});

export default rootReducer;