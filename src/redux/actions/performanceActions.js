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
    const response = await fetch(`http://localhost:8080/pms/assignGoals`, { // Assume this endpoint; update with real one
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resourceId, goalIds }),
    });
    if (!response.ok) {
      throw new Error('Failed to assign goals');
    }
    alert('Goals assigned successfully');
  } catch (error) {
    console.error(error);
    alert('Assignment failed: ' + error.message);
  }
};