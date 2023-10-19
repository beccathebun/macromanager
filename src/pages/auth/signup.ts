import { PrismaClient } from '@prisma/client';
import { type APIRoute } from 'astro';
export const POST: APIRoute = async ({ cookies, request }) => {
  const prisma = new PrismaClient();
  const { username = '', password = '' } = (await request.json()) as {
    username: string;
    password: string;
  };
  if (!username || !password)
    return { status: 400, body: 'Missing username or password' };
  const hashed = await Bun.password.hash(password);
  const [user, sessionId] = await prisma.$transaction(async tx => {
    const { password: _, ...user } = await tx.user.create({
      data: {
        name: username,
        password: hashed,
      },
    });
    const session = await tx.session.create({
      data: {
        userId: user.id,
      },
    });
    return [user, session.id];
  });
  cookies.set('sessionId', sessionId, {
    path: '/',
    httpOnly: true,
    maxAge: 31536000,
    sameSite: 'strict',
  });
  return {
    status: 201,
    body: JSON.stringify(user),
  };
};
