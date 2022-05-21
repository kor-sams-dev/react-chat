import React, { useMemo } from 'react';
import style from './messageCards.module.css';
import MessageCard from '../messageCard/messageCard';

const MessageCards = ({ socket, messages }) => {
  return (
    <div className={style.message}>
      {messages.map((message, index) => {
        let nameHidden = false;
        let position = message.client === socket.getIo().id ? 'right' : 'left';
        console.log(position);
        if (index > 0)
          nameHidden = messages[index - 1].client === message.client;

        return (
          <MessageCard
            key={message.key}
            message={message}
            nameHidden={nameHidden}
            position={position}
          />
        );
      })}
    </div>
  );
};

export default React.memo(MessageCards);
