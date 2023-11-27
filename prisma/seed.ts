import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // Create roles if they don't exist
  const roles = ['teacher', 'admin', 'student', 'superadmin', 'parent'];

  for (const roleName of roles) {
    const existingRole = await prisma.role.findUnique({
      where: {
        name: roleName,
      },
    });

    if (!existingRole) {
      await prisma.role.create({
        data: {
          name: roleName,
        },
      });
    }
  }

  // Check if the user with scisuserid '2020-00-00000' already exists
  const existingUser = await prisma.scisUser.findUnique({
    where: {
      scisuserid: '2020-00-00000',
    },
  });

  // Create a user if not present
  if (!existingUser) {
    const adminUser = await prisma.scisUser.create({
      data: {
        password: 'yourpasswordhere',
        scisuserid: '2020-00-00000',
        roleId: 'admin',
      },
    });

    console.log('User created successfully!');
  } else {
    console.log('User already exists. Skipping user creation.');
  }

  console.log('Seed data created successfully!');
}

seed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
