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
    contacts: [],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  /**
   * Add contact
   */
  const addContact = contact => {
    contact.id = uuid.v4();

    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  /**
   * Delete Contact
   */
  const deleteContact = contactId => {
    dispatch({ type: DELETE_CONTACT, payload: contactId });
  };

  /**
   * Set current contact
   */
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  /**
   * Clear current contact
   */
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  /**
   * Update Contact
   */
  const editContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  /**
   * Filter contacts
   */
  const filterContacts = str => {
    dispatch({ type: FILTER_CONTACTS, payload: str });
  };

  /**
   * Clear filter
   */
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const { contacts, current, filtered } = state;

  return (
    <ContactContext.Provider
      value={{
        contacts,
        current,
        filtered,
        addContact,
        editContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
