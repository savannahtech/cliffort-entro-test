import { NextFunction, Request, Response } from 'express';
import { RequestData } from './types';

interface RouteParams {
	statusCode?: number;
	renderResults?: boolean;
}

/**
 * function to apply route function and call next error handler in case an error occurs
 */
export function route({ statusCode = 200, renderResults = false }: RouteParams = {}) {
	return function (target: unknown, _propertyKey: unknown, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
			try {
				const requestInfo: RequestData = {
					payload: req.body.data,
					query: req.query,
					params: req.params,
				};
				let data = await originalMethod.apply(target, [requestInfo]);

				if (!data?.data) data = { data };

				if (renderResults) return res.status(200).setHeader('Content-Type', 'text/html').send(data.data);
				return res.status(statusCode).json({ ...data });
			} catch (error) {
				next(error);
			}
		};
	};
}
