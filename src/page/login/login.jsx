import userEvent from '@testing-library/user-event';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleConnect } from './login.function';
import style from './login.module.css';

const Login = ({ socket }) => {
  const serverRef = useRef();
  const portRef = useRef();
  const nameRef = useRef();
  const [connectType, setConnectType] = useState('http');
  let navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (
      handleConnect({
        connectType: connectType,
        socket,
        server: serverRef.current.value,
        port: portRef.current.value,
        name: nameRef.current.value,
      })
    ) {
      navigate('/react-chat/message');
    } else {
      alert('fail connect server');
    }
  };

  const handleChangeConnectInfo = (e) => {
    setConnectType(e.target.value);
  };

  useEffect(() => {
    const server = localStorage.getItem('chat-server');
    const port = localStorage.getItem('chat-port');
    const name = localStorage.getItem('chat-name');
    serverRef.current.value = server ? server : '';
    portRef.current.value = port ? port : '';
    nameRef.current.value = name ? name : '';
  }, []);

  return (
    <main className={style.login}>
      <form className={style.card} onSubmit={handleSubmit}>
        <h1 className={style.title}>LOG IN</h1>
        <div>
          <input
            type="radio"
            id="http"
            name="connectInfo"
            value="http"
            onChange={handleChangeConnectInfo}
            defaultChecked
          />
          <label htmlFor="http">http</label>
          <input
            type="radio"
            id="https"
            name="connectInfo"
            value="https"
            onChange={handleChangeConnectInfo}
          />
          <label htmlFor="https">https</label>
        </div>
        <div className={style.server_wrapper}>
          <h2 className={style.title_info}>Server</h2>
          <input
            className={style.server_info}
            ref={serverRef}
            placeholder="please enter server info..."
          ></input>
        </div>
        <div className={style.server_wrapper}>
          <h2 className={style.title_info}>Port</h2>
          <input
            className={style.server_info}
            ref={portRef}
            placeholder="please enter server port..."
          ></input>
        </div>
        <div className={style.server_wrapper}>
          <h2 className={style.title_info}>Name</h2>
          <input
            className={style.server_info}
            ref={nameRef}
            placeholder="please enter server Name..."
          ></input>
        </div>
        <button className={style.submit}>Connect!</button>
      </form>
    </main>
  );
};

export default Login;
