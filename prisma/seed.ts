import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // Create roles
  const roles = ['teacher', 'admin', 'student', 'superadmin', 'parent'];

  for (const roleName of roles) {
    await prisma.role.create({
      data: {
        name: roleName,
      },
    });
  }

  // Create a user
  const adminUser = await prisma.scisUser.create({
    data: {
      password: 'yourpasswordhere',
      scisuserid: '2020-00-00000',
      roleId: 'admin',
    },
  });

  console.log('Seed data created successfully!');
}

seed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
