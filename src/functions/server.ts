import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { readJSON } from './jsonWorker.js';
import { join, resolve } from 'path';
import type { Settings } from '../types/settings.js';
import { readdirSync } from 'fs';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const settings: Settings = await readJSON<Settings>('config.json');

/**
 * @name server
 * @description This constant is the Fastify server
 * @constant
 */
const fastifyInstance: FastifyInstance = Fastify({ logger: false });

await fastifyInstance.register(import('@fastify/static'), {
    root: join(resolve('.'), 'public'),
    serve: false,
});

console.log(__dirname + '\\serveFile.js');

const { serveFile } = await import('./serveFile.js');

for (const dir of settings.paths) {
    try {
        for (const file of readdirSync(dir)) {
            await serveFile(fastifyInstance, file);
        }
    } catch (e) {
        if ((e as NodeJS.ErrnoException).code == 'ENOENT') {
            console.error(`The directory ${dir} does not exist`);
        } else console.error(e);
    }
}

/**
 * Start Fastify server
 *
 * @async
 */
export async function start(): Promise<void> {
    try {
        await fastifyInstance.listen(settings.fastify);
    } catch (err) {
        fastifyInstance.log.error('Fastify server failed to start:\n');
        fastifyInstance.log.error(err);
        process.exit(1);
    }
}
