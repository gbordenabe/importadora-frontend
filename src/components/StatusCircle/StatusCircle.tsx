import React from 'react';
import styles from './StatusCircle.module.css'; // Import the CSS module

const StatusCircle = ({ status, size }:any) => {
  const statusColorClass = {
    OK: styles.green,
    EDITED: styles.yellow,
    REJECTED: styles.red,
    PENDING: styles.blue,
  
  };

  const colorClass = statusColorClass[status.toUpperCase()] || styles.green;

  const circleStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
  };

  return <div className={colorClass} style={circleStyle} />;
};

export default StatusCircle;
