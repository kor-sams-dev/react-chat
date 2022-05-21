const handleConnect = ({ socket, server, port, name }) => {
  const result = socket.connect({ server, port, name });

  if (result) {
    localStorage.setItem('chat-server', server);
    localStorage.setItem('chat-port', port);
    localStorage.setItem('chat-name', name);
  }
  return result;
};

export { handleConnect };
