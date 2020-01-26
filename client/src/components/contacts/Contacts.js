import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';

import Spinner from '../layout/Spinner';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, loading, getContacts } = contactContext;

  useEffect(() => {
    getContacts();

    // eslint-disable-next-line
  }, []);

  if (contacts && contacts.length === 0) {
    return <h4 className="text-center">Please add a contact</h4>;
  }

  const items = filtered !== null ? filtered : contacts;

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {items.map(contact => (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
