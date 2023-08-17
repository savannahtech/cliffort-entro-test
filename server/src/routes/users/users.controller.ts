import { PrismaClient } from '@prisma/client';
import { route } from '../../_services/route';
import { RequestData } from 'src/_services/types';
import { UsersService } from './users.service';

const service = new UsersService();
export class UsersController {
	static _prismaClient = new PrismaClient();

	@route()
	async getUsers({}: RequestData<unknown, unknown>) {
		return service.getUsers();
	}
}
