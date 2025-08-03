const initialState = {
  annualAssessment: [],
  subordinates: [],
  goals: [], 
};

const performanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ANNUAL_ASSESSMENT_SUCCESS':
      return {
        ...state,
        annualAssessment: action.payload,
      };
    case 'FETCH_SUBORDINATES_SUCCESS':
      return {
        ...state,
        subordinates: action.payload,
      };
    case 'FETCH_GOALS_SUCCESS':
      return {
        ...state,
        goals: action.payload,
      };
    default:
      return state;
  }
};

export default performanceReducer;