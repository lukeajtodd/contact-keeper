import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div className={`alert alert-${alert.type}`} key={alert.id}>
        <i className="fas fa-info-circle mr-1"></i>
        {alert.message}
      </div>
    ))
  );
};

export default Alerts;
