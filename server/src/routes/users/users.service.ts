import { PrismaClient } from '@prisma/client';

export class UsersService {
	get _prismaClient() {
		return new PrismaClient();
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
