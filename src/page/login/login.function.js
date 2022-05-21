const handleConnect = ({ connectType, socket, server, port, name }) => {
  const result = socket.connect({ connectType, server, port, name });

  if (result) {
    localStorage.setItem('chat-server', server);
    localStorage.setItem('chat-port', port);
    localStorage.setItem('chat-name', name);
  }
  return result;
};

export { handleConnect };
