import { createServer } from './app';

export function startServer() {
	const server = createServer();

	const port = process.env.PORT || '4444';

	// TODO: initialize DB and other stuff here

	server.listen(port, () => {
		console.log(`🎉 server running on port http://localhost:${port}`);
	});
}

startServer();
