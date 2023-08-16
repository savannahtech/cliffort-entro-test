export class BaseError extends Error {
	meta: any;
	statusCode: number;

	constructor(message: string, statusCode = 400, meta?: any) {
		super(message);
		this.name = 'BaseError';
		this.meta = meta;
		this.statusCode = statusCode;
		if (Error.captureStackTrace) Error.captureStackTrace(this, BaseError);
	}

	toJSON() {
		return {
			message: this.message,
			statusCode: this.statusCode,
			meta: this.meta,
			date: new Date().toISOString(),
		};
	}

	static InternalServerError = new BaseError('Internal Server Error', 500);

	static EndpointNotFound = new BaseError(`Endpoint not found`, 404);
}
