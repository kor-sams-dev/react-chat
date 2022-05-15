const handleConnect = ({ socket, server, port, name }) => {
  const result = socket.connect({ server, port });

  if (result) {
    sessionStorage.setItem('server', server);
    sessionStorage.setItem('port', port);
    sessionStorage.setItem('name', name);
  }
  return result;
};

export { handleConnect };
