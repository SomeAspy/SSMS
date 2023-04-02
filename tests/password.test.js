import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import { auth } from '../src/functions/password.js';

const __dirname = dirname(fileURLToPath(import.meta.url));


test('AuthFailure', async () => {
    expect(await auth('public/OSI-password.png', 'no', __dirname + '/resources/test.passwords.json')).toBe(false);
});

test('AuthSuccess', async () => {
    expect(await auth('public/OSI-password.png', 'password', __dirname + '/resources/test.passwords.json')).toBe(true);
});
