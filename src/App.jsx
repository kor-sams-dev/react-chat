import style from './App.module.css';
import Login from './page/login/login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Message from './page/message/message';
import { Socket } from './service/socket';

const socket = new Socket();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/react-chat" element={<Login socket={socket} />} />
        <Route path="/message" element={<Message socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
