// prisma/seed.js

import { prisma } from "../src/utils/prisma.js";
import bcrypt from "bcryptjs";

export const createAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;
    const adminPhone = process.env.ADMIN_PHONE;
    const adminSalary = process.env.ADMIN_SALARY;
    const adminAddress = process.env.ADMIN_ADDRESS;

    if (!adminEmail || !adminPassword || !adminName) {
      console.log(
        "⚠ Admin credentials missing in .env - skipping admin creation",
      );
      return;
    }

    const existingAdmin = await prisma.user.findFirst({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log("✓ Admin user already exists");
      return;
    }

    const hashedPass = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.create({
      data: {
        full_name: adminName,
        email: adminEmail,
        password: hashedPass,
        phone: adminPhone,
        status: "active",
        salary: Number(adminSalary),
        address: adminAddress,
        role: {
          connect: { role_name: "admin" },
        },
      },
    });

    console.log(
      `✓ Admin '${admin.full_name}' created successfully with role ADMIN`,
    );
  } catch (error) {
    console.error("Error in seed:", error.message);
  } finally {
    await prisma.$disconnect();
  }
};
