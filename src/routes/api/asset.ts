import type { EndpointOutput, RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import prisma from '$lib/prisma';
import type { Asset } from '@prisma/client';

// GET /todos.json
export const get = async (request) => {
	// request.locals.userid comes from src/hooks.js
	const res = await prisma.asset.findMany();

	// if (response.status === 404) {
	// 	// user hasn't created a todo list.
	// 	// start with an empty array
	// 	return { body: [] };
	// }

	return { body: res, status: 200 };
};

export const put = async (request) => {
	// request.locals.userid comes from src/hooks.js
	const target = request.body;
	const res = await prisma.asset.update({ data: target, where: { id: target.id } });

	// if (response.status === 404) {
	// 	// user hasn't created a todo list.
	// 	// start with an empty array
	// 	return { body: [] };
	// }

	return { body: res, status: 200 };
};

export const post = async (request) => {
	// request.locals.userid comes from src/hooks.js
	const target = request.body;
	const res = await prisma.asset.create({ data: target });

	// if (response.status === 404) {
	// 	// user hasn't created a todo list.
	// 	// start with an empty array
	// 	return { body: [] };
	// }

	return { body: res, status: 200 };
};

export const del = async (request) => {
	const id = Number(request.body.id);
	const res = await prisma.asset.delete({ where: { id } });
	return { body: res, status: 200 };
};
