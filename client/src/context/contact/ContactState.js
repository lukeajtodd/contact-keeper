import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: []
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  /**
   * Add contact
   */

  /**
   * Delete Contact
   */

  /**
   * Set current contact
   */

  /**
   * Clear current contact
   */

  /**
   * Update Contact
   */

  /**
   * Filter contacts
   */

  /**
   * Clear filter
   */

  const { contacts } = state;

  return (
    <ContactContext.Provider value={{ contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
