import { randomBytes } from 'crypto';
import { readJSON } from './JsonWorker.js';
import { hash, verify } from 'argon2';

const db = 'database/passwords.json';

/**
 * This function generates a random salt
 *
 * @returns {string}: The salt
 * @example makeSalt();
 */
function makeSalt() {
    return randomBytes(64).toString('hex');
}

/**
 * This function builds an object with the path, the hash and the salt
 *
 * @async
 * @param {string} file The path to the file
 * @param {string} password The password to hash
 * @returns {object} The object with the path, the hash and the salt
 */
async function buildObject(file, password) {
    const salt = makeSalt();
    return {
        path: file,
        hash: await hash(password + salt),
        salt: salt
    };
}

/**
 * This function checks if a file's password matches
 *
 * @async
 * @param {string} path The path to the file
 * @param {string} password The password to check
 * @param {string} pdb The path to the database | default: `db` const
 * @returns {boolean} True if the password matches, false otherwise
 */
export async function auth(path, password, pdb = db) {
    const data = await readJSON(pdb);
    for (let i = 0; i < data.length; ++i) {
        if (data[i].path === path) {
            return await verify(data[i].hash, password + data[i].salt);
        }
    }
    return false;
}

console.log(await buildObject('public/OSI-password.png', 'password'));

console.log(await auth('public/OSI-password.png', 'password'));
