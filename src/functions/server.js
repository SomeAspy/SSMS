import Fastify from 'fastify';
import { readJSON } from './JsonWorker.js';

const config = await readJSON('config.json');

/**
 * Fastify server
 *
 * @type {any}
 */
export const server = Fastify({ logger: true });

/**
 * Fastify server settings
 *
 * @type {object}
 */
const fastifySettings = {
    logger: config.fastifyLogger,
    port: config.port,
    host: config.host,
};

/**
 * Start Fastify server
 *
 * @async
 */
export const start = async () => {
    try {
        await server.listen(fastifySettings);
    } catch (err) {
        server.log.error('Fastify server failed to start:\n' + err);
        process.exit(1);
    }
};
