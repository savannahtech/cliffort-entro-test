import { type Express } from 'express';
import { HttpMethod, Route } from './types';

const testRoute: Route = [
  '/hello',
  HttpMethod.Get,
  (_, res) => {
    res.json({ hello: 'World!!' });
  },
];

const routes: Route[] = [testRoute];

export function createRoutes(app: Express) {
  routes.forEach(([path, method, handler]) => {
    app[method](path, handler);
  });
}
