export const logout = () => ({
  type: 'LOGOUT'
});

export const setUser = (user = {}) => ({
  type: 'SET_USER',
  payload: user
});

export const fetchUser = id => ({
  type: 'FETCH_USER',
  payload: id
});

export const setNotifications = message => ({
  type: 'SET_NOTIFICATIONS',
  payload: message
});

export const clearNotifications = () => ({
  type: 'CLEAR_NOTIFICATIONS'
});

export const setErrors = (errors = {}) => ({
  type: 'SET_FORM_ERRORS',
  payload: errors
});

export const clearErrors = () => ({
  type: 'CLEAR_ERRORS'
});

export const updatePassword = data => ({
  type: 'UPDATE_PASSWORD',
  payload: data,
});

export const postData = (data, route) => ({
  type: 'POST_DATA',
  payload: data,
  route: route
});

export const getData = (route) => ({
  type: 'GET_DATA',
  route: route
});

export const fetchSuccess = data => ({
  type: 'SUCCESS',
  payload: data
});

export const clearFetch = () => ({
  type: 'CLEAR_FETCH'
});

export const fetchLoading = () => ({
  type: 'LOADING'
});

export const clearAll = () => ({
  type: 'CLEAR_ALL'
});

