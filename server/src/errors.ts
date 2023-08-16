import type { NextFunction, Request, Response } from 'express';
import { BaseError } from './_services/BaseError';

export function handle404Error(_req: Request, __: Response, next: NextFunction) {
	next(BaseError.EndpointNotFound);
}

export function handleUncaughtErrors(err: BaseError | Error, _: Request, res: Response, __: NextFunction) {
	let error = BaseError.InternalServerError.toJSON();

	/* ignore next */
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
		error.meta = err.stack;
		console.log(err.stack);
	}

	/* ignore else */
	if (err instanceof BaseError) error = err.toJSON();

	res.status(error.statusCode ?? 500).json(error);
}
