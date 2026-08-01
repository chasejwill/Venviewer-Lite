import { PrismaClient } from "@prisma/client";
import { FALLS_OF_THE_OHIO } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("The example seed is development-only.");
  }

  await prisma.tour.upsert({
    where: { slug: "falls-of-the-ohio" },
    update: {},
    create: FALLS_OF_THE_OHIO,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
