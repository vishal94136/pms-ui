export const fetchAnnualAssessment = () => async (dispatch, getState) => {
  try {
    const managerId = getState().auth.user.id;
    if (!managerId) {
      throw new Error('Manager ID not available');
    }
    const response = await fetch(`http://localhost:8080/pms/annualAssessment/manager/${managerId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch annual assessment');
    }
    const data = await response.json();
    dispatch({
      type: 'FETCH_ANNUAL_ASSESSMENT_SUCCESS',
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateAssessment = (id, updatedData) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/pms/annualAssessment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update assessment');
    }
    dispatch(fetchAnnualAssessment());
  } catch (error) {
    console.error(error);
    alert('Update failed: ' + error.message);
  }
};

export const fetchSubordinates = () => async (dispatch, getState) => {
  try {
    const managerId = getState().auth.user.id;
    if (!managerId) {
      throw new Error('Manager ID not available');
    }
    const response = await fetch(`http://localhost:8080/pms/manager/${managerId}/getResource`);
    if (!response.ok) {
      throw new Error('Failed to fetch subordinates');
    }
    const data = await response.json();
    dispatch({
      type: 'FETCH_SUBORDINATES_SUCCESS',
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchGoals = () => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/pms/goal`);
    if (!response.ok) {
      throw new Error('Failed to fetch goals');
    }
    const data = await response.json();
    dispatch({
      type: 'FETCH_GOALS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const assignGoals = (resourceId, goalIds) => async (dispatch) => {
  try {
    const promises = goalIds.map((goalId) =>
      fetch(`http://localhost:8080/pms/resource/${resourceId}/goals/${goalId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
      }).then((response) => {
        if (!response.ok) {
          return response.text().then((text) => { throw new Error(text || 'Failed to assign goal'); });
        }
      })
    );
    await Promise.all(promises);
    alert('Goals assigned successfully');
  } catch (error) {
    console.error(error);
    alert('Assignment failed: ' + error.message);
  }
};

export const fetchManagerGoals = () => async (dispatch, getState) => {
  try {
    const managerId = getState().auth.user.id;
    if (!managerId) {
      throw new Error('Manager ID not available');
    }
    const response = await fetch(`http://localhost:8080/pms/annualAssessment/manager/${managerId}/goals`);
    if (!response.ok) {
      throw new Error('Failed to fetch manager goals');
    }
    const data = await response.json();
    dispatch({
      type: 'FETCH_MANAGER_GOALS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchMyAssessment = () => async (dispatch, getState) => {
  try {
    const resourceId = getState().auth.user.id;
    if (!resourceId) {
      throw new Error('Resource ID not available');
    }
    const response = await fetch(`http://localhost:8080/pms/annualAssessment/resource/${resourceId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch my assessment');
    }
    const data = await response.json();
    dispatch({
      type: 'FETCH_MY_ASSESSMENT_SUCCESS',
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchMyGoals = () => async (dispatch, getState) => {
  try {
    const resourceId = getState().auth.user.id;
    if (!resourceId) {
      throw new Error('Resource ID not available');
    }
    const response = await fetch(`http://localhost:8080/pms/resource/${resourceId}/goals`);
    if (!response.ok) {
      throw new Error('Failed to fetch my goals');
    }
    const data = await response.json();
    dispatch({
      type: 'FETCH_MY_GOALS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateMyGoalStatus = (newStatus, year) => async (dispatch, getState) => {
  try {
    const resourceId = getState().auth.user.id;
    if (!resourceId || !year) {
      throw new Error('Resource ID or Year not available');
    }
    const response = await fetch(`http://localhost:8080/pms/resource/${resourceId}/years/${year}/updateGoalStatus`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newStatus }),
    });
    if (!response.ok) {
      throw new Error('Failed to update goal status');
    }
    dispatch({
      type: 'UPDATE_MY_GOAL_STATUS_SUCCESS',
      payload: newStatus,
    });
  } catch (error) {
    console.error(error);
    alert('Update failed: ' + error.message);
  }
};
