import { FastifyInstance } from 'fastify';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @name serveFile
 * @description This function serves a file from the database
 * @param {fastifyInstance} fastifyInstance The Fastify Instance
 * @param {string} path The path to the file
 * @param {boolean} [secured=false] If the file is secured
 * @param {string} [root=__dirname + '/../public/'] The root directory
 * @async
 * @returns {Promise<void>}
 * @example serveFile(fastify, 'public/OSI-password.png', true);
 */
export async function serveFile(
    fastifyInstance: FastifyInstance,
    path: string,
    secured: boolean = false,
    root: string = __dirname + '/../public/'
): Promise<void> {
    console.log(secured);
    console.log(root);
    path = '/' + path;
    console.log(path);
    try {
        fastifyInstance.get(path, function (req, reply) {
            return reply.sendFile(path);
        });
    } catch (e) {
        console.log(e);
    }
}
