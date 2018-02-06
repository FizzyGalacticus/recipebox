class SocketIO {
	static getInstance() {
		if(!SocketIO.socket)
			SocketIO.socket = io(`https://localhost`);

		return SocketIO.socket;
	}
}

export let socket = SocketIO.getInstance();
