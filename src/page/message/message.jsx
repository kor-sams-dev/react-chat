import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageCards from '../../components/messageCards/messageCards';
import style from './message.module.css';

const Message = ({ socket }) => {
  const [state, setState] = useState({ message: '', name: '' });
  const [chat, setChat] = useState([]);

  let navigate = useNavigate();

  const onSocket = ({ name, message, client, key }) => {
    setChat((chat) => {
      return [...chat, { name, message, client, key }];
    });
  };

  useEffect(() => {
    if (socket.connectionState()) {
      socket.on('msgToClient', onSocket);
    } else {
      navigate('/');
    }
  }, []);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    if (!message) return;
    const key = Date.now();
    socket.emit('msgToServer', { message, key });
    setState({ message: '', name });
  };

  return (
    <div className={style.message_wrapper}>
      <div className={style.title}>
        <h1>Chat log</h1>
      </div>
      <div className={style.chats}>
        <MessageCards messages={chat} socket={socket} />
      </div>

      <form className={style.wrapper} onSubmit={onMessageSubmit}>
        <input
          className={style.message}
          name="message"
          onChange={(e) => onTextChange(e)}
          value={state.message}
          id="outlined-multiline-static"
          variant="outlined"
          label="Message"
          placeholder="메세지를 입력해주세요."
        />
        <button className={style.button_send}>전송</button>
      </form>
    </div>
  );
};

export default Message;
