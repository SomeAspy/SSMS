import { FastifyInstance } from 'fastify';
import { blacklisted } from './blacklist.js';
import { readJSON } from './jsonWorker.js';
import type { Settings } from '../types/settings.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const settings: Settings = await readJSON<Settings>('config.json');

/**
 * @name serveFile
 * @description This function serves a file from the database
 * @param fastifyInstance The Fastify Instance
 * @param path The path to the file
 * @param secured If the file is secured
 * @example serveFile(fastify, 'public/OSI-password.png', true);
 */
export async function serveFile(
    fastifyInstance: FastifyInstance,
    path: string,
    secured = false,
): Promise<void> {
    let filepath = path;
    console.log(secured);
    if (await blacklisted(path)) {
        if (settings.serve404) {
            console.log(`${__dirname}/../../static/HTML/404.html`);
            filepath = `${__dirname}/../../static/HTML/404.html`;
        }
    }
    path = '/' + path;
    try {
        fastifyInstance.route({
            method: 'GET',
            url: path,
            handler: async function (req, res) {
                await res.sendFile(filepath);
            },
        });
        if (!settings.requireFileExtension) {
            fastifyInstance.route({
                method: 'GET',
                url: path.split('.').slice(0, -1).join('.'),
                handler: async function (req, res) {
                    console.log(filepath);
                    await res.sendFile(filepath);
                },
            });
        }
    } catch (e) {
        console.log(e);
    }
}
