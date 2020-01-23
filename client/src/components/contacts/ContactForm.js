import React, { useState, useEffect, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, editContact, clearCurrent } = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();

    current !== null ? editContact(contact) : addContact(contact);

    clearCurrent();

    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current !== null ? 'Edit' : 'Add'} Contact
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <label>
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === 'personal'}
          onChange={onChange}
        />{' '}
        Personal{' '}
      </label>
      <label>
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === 'professional'}
          onChange={onChange}
        />{' '}
        Professional{' '}
      </label>

      <div>
        <input
          type="submit"
          value={current !== null ? 'Edit Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
