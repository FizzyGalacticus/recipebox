import config from 'config';

class SocketIO {
	static getInstance() {
		if(SocketIO.socket === undefined)
			SocketIO.socket = io(config.serverUrl);

		return SocketIO.socket;
	}
}

export const socket = SocketIO.getInstance();

export default SocketIO.getInstance();
