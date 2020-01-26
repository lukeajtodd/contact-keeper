import React, { useReducer } from 'react';
import uuid from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set alert
  const setAlert = (message, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({ type: SET_ALERT, payload: { id, type, message } });

    const timeoutEntry = setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
      clearTimeout(timeoutEntry);
    }, timeout);
  };

  // Remove alert
  const removeAlert = id => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert, removeAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
