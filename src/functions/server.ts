import Fastify from 'fastify';
const FastifyServer = Fastify();
import fastifyStatic from '@fastify/static';
import { readJSON } from './JsonWorker.js';
import { join, resolve } from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = await readJSON('src/config.json');

FastifyServer.register(fastifyStatic, {
    root: join(resolve('.'), 'public'),
});

/**
 * @name server
 * @description This constant is the Fastify server
 * @type {any}
 * @constant
 */
const fastifyInstance: any = Fastify({ logger: false });

/**
 * Fastify server settings
 *
 * @type {object}
 */
const fastifySettings: object = {
    logger: config.fastifyLogger,
    port: config.port,
    host: config.host,
};

console.log(__dirname + '\\serveFile.js');

const { serveFile } = await import('file://' + __dirname + '\\serveFile.js');
serveFile('public/OSI-password.png');

console.log('hello');

/**
 * Start Fastify server
 *
 * @async
 */
export const start = async () => {
    try {
        await fastifyInstance.listen(fastifySettings);
    } catch (err) {
        fastifyInstance.log.error('Fastify server failed to start:\n' + err);
        process.exit(1);
    }
};
