import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const prismauser = prisma.$extends({
  name: 'userextension',
  model: {
    user: {
      async signUp(username: string, password: string) {
        const hashed = await Bun.password.hash(password);
        const user = await prisma.user.create({
          data: {
            name: username,
            password: hashed,
          },
        });
        return await prisma.session.create({
          data: {
            userId: user.id,
          },
        });
      },
      async login(username: string, password: string) {
        const user = await prisma.user.findUnique({
          where: {
            name: username,
          },
        });
        if (!user) {
          throw new Error('Invalid username or password');
        }
        const valid = await Bun.password.verify(password, user.password);
        if (!valid) {
          throw new Error('Invalid username or password');
        }
        return await prisma.session.create({
          data: {
            userId: user.id,
          },
        });
      },
    },
  },
});
