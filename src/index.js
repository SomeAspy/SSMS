import { server, start } from './src/functions/server.js';

export const paths = ['./public'];


server.get('/', async () => {
    return { hello: 'world' };
});

await start();
