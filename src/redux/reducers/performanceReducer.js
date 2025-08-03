const initialState = {
  annualAssessment: [],
  subordinates: [],
  goals: [],
  managerGoals: [],
  myAssessment: [],
  myGoals: { goals: [], overallGoalStatus: '' },
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
    case 'FETCH_MANAGER_GOALS_SUCCESS':
      return {
        ...state,
        managerGoals: action.payload,
      };
    case 'FETCH_MY_ASSESSMENT_SUCCESS':
      return {
        ...state,
        myAssessment: action.payload,
      };
    case 'FETCH_MY_GOALS_SUCCESS':
      return {
        ...state,
        myGoals: action.payload,
      };
    case 'UPDATE_MY_GOAL_STATUS_SUCCESS':
      return {
        ...state,
        myGoals: { ...state.myGoals, overallGoalStatus: action.payload },
      };
    default:
      return state;
  }
};

export default performanceReducer;