export const login = (credentials) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:8080/pms/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { name: data.resourceName, roles: data.roles, id: data.resource_id },
    });
  } catch (error) {
    alert(error.message || 'Invalid credentials');
  }
};

export const logout = () => ({
  type: 'LOGOUT',
});