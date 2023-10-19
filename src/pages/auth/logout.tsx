import { PrismaClient } from '@prisma/client';
import type { APIContext, APIRoute } from 'astro';
export const GET: APIRoute = async (context: APIContext) => {
  const prisma = new PrismaClient();
  const cookie = context.cookies.get('sessionId');
  if (!cookie) {
    return {
      status: 400,
      body: 'No session found',
    };
  }
  await prisma.session.delete({
    where: {
      id: cookie.value,
    },
  });
  context.cookies.delete('sessionId');
  return {
    status: 200,
    body: 'Logged out',
  };
};
