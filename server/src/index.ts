import { createServer } from './app';

(() => {
	const server = createServer();

	const port = process.env.PORT ?? '4444';

	// TODO: initialize DB and other stuff here
	server.listen(port, () => {
		console.log(`🎉 server running on port http://localhost:${port}`);
	});
})();
