let Socket = null;
export default function socket() {
	if (Socket)
		return Socket;
	else {
		console.log('making new socket');
		Socket = io(`https://localhost`);
		return Socket;
	}
}