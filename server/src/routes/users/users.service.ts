import { PrismaInstance } from '../../_services/PrismaSingleton';

export class UsersService {
	static _prismaClient = PrismaInstance;
	get _prismaClient() {
		return PrismaInstance;
	}

	async getUsers() {
		const users = await this._prismaClient.user.findMany({
			orderBy: {
				name: 'desc',
			},
		});

		return { users, count: users.length };
	}
}
