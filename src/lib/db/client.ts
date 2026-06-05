import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { isNil } from 'lodash';
import paginateExt from 'prisma-paginate';

const getRequiredEnv = (name: 'DATABASE_URL') => {
    const value = process.env[name];
    if (!value) throw new Error(`Missing required environment variable: ${name}`);
    return value;
};

const prismaClientSingleton = () => {
    const adapter = new PrismaPg({
        connectionString: getRequiredEnv('DATABASE_URL'),
    });

    return new PrismaClient({ adapter, log: ['error'] }).$extends(paginateExt);
};

declare global {
    /* eslint-disable vars-on-top */
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
    /* eslint-enable vars-on-top */
}

const db = !isNil(globalThis.prismaGlobal) ? globalThis.prismaGlobal : prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = db;
}
