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
  const [user, sessionId] = await prisma.$transaction(async tx => {
    const user = await tx.user.findUnique({
      where: { name: username },
    });
    if (!user) return [null, null];
    const { password: hashed, ...rest } = user;
    if (!(await Bun.password.verify(password, hashed))) return [rest, null];
    const session = await tx.session.create({
      data: {
        userId: user.id,
      },
    });
    return [rest, session.id];
  });
  if (!user) return { status: 404, body: 'User not found' };
  if (!sessionId) return { status: 401, body: 'Invalid password' };
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
