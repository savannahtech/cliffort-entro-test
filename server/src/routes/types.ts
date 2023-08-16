import { type RequestHandler } from 'express';

export enum HttpMethod {
	Get = 'get',
	Post = 'post',
	Put = 'put',
	Patch = 'patch',
	Delete = 'delete',
}

export type Route = [path: string, method: HttpMethod, handler: RequestHandler];
