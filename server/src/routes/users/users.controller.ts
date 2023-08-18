import { route } from '../../_services/route';
import { RequestData } from 'src/_services/types';
import { UsersService } from './users.service';
import { PrismaInstance } from '../../_services/PrismaSingleton';

const service = new UsersService();
export class UsersController {
	static _prismaClient = PrismaInstance;

	@route()
	async getUsers({}: RequestData<unknown, unknown>) {
		return service.getUsers();
	}
}
