import Fastify from 'fastify';

export interface Settings {
    fastify: Fastify.FastifyListenOptions;
    serve404: boolean;
    serveHome: boolean;
    browse: boolean;
    passwordDefault: boolean;
    defaultPassword: string;
    requireFileExtension: boolean;
    blacklist: {
        regex: string;
        extensions: string[];
    };
    paths: string[];
}
