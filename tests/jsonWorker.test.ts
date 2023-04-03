import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import { writeJSON, readJSON } from '../src/functions/JsonWorker.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const testFile = __dirname + '/resources/test.jsonWorker.json';

test('WriteJSON', async () => {
    await writeJSON(testFile, { hello: 'world' });
    await import(testFile).then((data) => {
        expect(data.default.hello).toBe('world');
    });
});

test('ReadJSON', async () => {
    await expect(readJSON(testFile)).resolves.toEqual({ hello: 'world' });
});
