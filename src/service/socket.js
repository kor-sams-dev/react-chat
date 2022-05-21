import io from 'socket.io-client';

class Socket {
  #server = '';
  #port = '';
  #name = '';
  #io;

  connectionState() {
    return !!this.#io;
  }

  async connect({ connectType, server, port, name }) {
    try {
      this.#io = await io.connect(`${connectType}://${server}:${port}`);
      this.#server = server;
      this.#port = port;
      this.#name = name;
      return true;
    } catch {
      this.#server = '';
      this.#port = '';
      this.#name = '';
      this.#io = undefined;
      return false;
    }
  }

  on(event, eventFunction) {
    if (this.connectionState()) {
      this.#io.on(event, eventFunction);
    }
  }

  emit(event, payload) {
    this.#io.emit(event, { ...payload, name: this.#name, client: this.#io.id });
  }

  getIo() {
    return this.#io;
  }
}

export { Socket };
