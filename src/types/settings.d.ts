import Fastify from "fastify";

export interface Settings {
    fastify: Fastify.FastifyListenOptions;
    serve404: boolean;
    serveHome: boolean;
    browse: boolean;
    passwordDefault: boolean;
    defaultPassword: string;
    blacklist: string[];
    paths: string[];
}
