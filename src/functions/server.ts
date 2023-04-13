import type {FastifyInstance} from "fastify";
import Fastify from "fastify";
const FastifyServer = Fastify();
import fastifyStatic from "@fastify/static";
import {readJSON} from "./jsonWorker.js";
import {join, resolve} from "path";
import type {Settings} from "../types/settings.js";

import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const settings: Settings = await readJSON<Settings>("src/config.json");

await FastifyServer.register(fastifyStatic, {
    root: join(resolve("."), "public")
});

/**
 * @name server
 * @description This constant is the Fastify server
 * @constant
 */
const fastifyInstance: FastifyInstance = Fastify({logger: false});

console.log(__dirname + "\\serveFile.js");

const {serveFile} = await import("./serveFile.js");
serveFile(fastifyInstance, "public/OSI-password.png");

console.log("hello");

/**
 * Start Fastify server
 *
 * @async
 */
export async function start(): Promise<void> {
    try {
        await fastifyInstance.listen(settings.fastify);
    } catch (err) {
        fastifyInstance.log.error("Fastify server failed to start:\n");
        fastifyInstance.log.error(err);
        process.exit(1);
    }
}
