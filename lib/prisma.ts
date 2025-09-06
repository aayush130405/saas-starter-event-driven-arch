import { PrismaClient } from "@/app/generated/prisma";

const prismaClientSingular = () => {        //returns an instance of prisma client whenever it is called
    return new PrismaClient();
};

type prismaClientSingular = ReturnType<typeof prismaClientSingular> //whenever we call the method prismaClientSingular we are expecting return type of prismaClientSingular

const globalForPrisma = globalThis as unknown as { prisma : PrismaClient | undefined };         //to check if instance of prisma exists

const prisma = globalForPrisma.prisma ?? prismaClientSingular();         //if instance of prisma exists, return it, else create a new instance

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;