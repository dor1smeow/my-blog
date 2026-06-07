import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
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

const getDb = () => {
    if (!globalThis.prismaGlobal) {
        globalThis.prismaGlobal = prismaClientSingleton();
    }

    return globalThis.prismaGlobal;
};

const db = new Proxy({} as ReturnType<typeof prismaClientSingleton>, {
    get(_target, prop, receiver) {
        const value = Reflect.get(getDb(), prop, receiver);

        return typeof value === 'function' ? value.bind(getDb()) : value;
    },
});

export default db;
