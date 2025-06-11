import React from 'react';
import './Card.css';

const Card = ({ title, children }) => {
  return (
    <div className="card">
      {title && <h2 className="card__title">{title}</h2>}
      <div className="card__content">
        {children}
      </div>
    </div>
  );
};

export default Card;
