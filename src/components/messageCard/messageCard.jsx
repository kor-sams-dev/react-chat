import React from 'react';
import style from './messageCard.module.css';

const MessageCard = ({ message, position, nameHidden }) => {
  const _position = position === 'right' ? style.right : style.left;
  const _nameHidden = nameHidden ? style.hidden : '';

  return (
    <div className={`${style.message_card} ${_position}`}>
      <h2 className={`${style.name} ${_nameHidden}`}>{message.name}</h2>
      <h3 className={`${style.message} ${_position}`}>{message.message}</h3>
    </div>
  );
};

export default MessageCard;
