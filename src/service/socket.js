import io from 'socket.io-client';

class Socket {
  #server = '';
  #port = '';
  #io;

  connectionState() {
    return !!this.#io;
  }

  async connect({ server, port }) {
    try {
      this.#io = await io.connect(`http://${server}:${port}`);
      console.log(this.#io);
      this.#server = server;
      this.#port = port;
      return true;
    } catch {
      this.#server = '';
      this.#port = '';
      return false;
    }
  }

  on(event) {
    console.log(event);
    if (this.connectionState()) {
      this.#io.on(event, (props) => {
        return props;
      });
    }
  }

  emit(event, payload) {
    this.#io.emit(event, payload);
  }

  getIo() {
    return this.#io;
  }
}

export { Socket };
