import Fastify from 'fastify';
import config from '../config.json' assert { type: 'json' };

export const server = Fastify({ logger: true });

const fastifySettings = {
    logger: config.fastifyLogger,
    port: config.port,
    host: config.host,
}

export const start = async () => {
    try {
        await server.listen(fastifySettings);
    } catch (err) {
        server.log.error("Fastify server failed to start:\n" + err);
        process.exit(1);
    }
}
