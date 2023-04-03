import { randomBytes } from 'crypto';
import { readJSON, writeJSON } from './jsonWorker.js';
import { hash, verify } from 'argon2';

import { SecureObject, SecureObjects } from '../types/password.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @name db
 * @description This constant is the path to the database
 * @example const db = __dirname + '/../database/passwords.json';
 * @default __dirname + '/../database/passwords.json'
 * @constant
 */
const db: string = __dirname + '/../database/passwords.json';

/**
 * @name makeSalt
 * @description This function generates a random salt
 * @returns The salt
 * @example makeSalt();
 */
function makeSalt(): string {
    return randomBytes(64).toString('hex');
}

/**
 * @name buildSecureObject
 * @description This function builds an object with the path, the hash and the salt
 * @async
 * @param file The path to the file
 * @param password The password to hash
 * @returns The object with the path, the hash and the salt
 * @example buildSecureObject('public/OSI-password.png', 'password');
 */
async function buildSecureObject(
    file: string,
    password: string
): Promise<SecureObject> {
    const salt = makeSalt();
    return {
        path: file,
        hash: await hash(password + salt),
        salt: salt,
    };
}

/**
 * @name newSecureFile
 * @description This function adds a new secure file to the database
 * @async
 * @param  file The path to the file
 * @param password The password to hash
 * @param [dbp=db] The path to the database
 * @throws {Error} If the file already exists
 * @example newSecureFile('public/OSI-password.png', 'password', false, 'database/passwords.json');
 */
export async function newSecureFile(
    file: string,
    password: string,
    dbp: string = db
): Promise<void> {
    const data = await readJSON<SecureObjects>(dbp);
    const secureObject = await buildSecureObject(file, password);
    if (data.find((e: SecureObject) => e.path === file)) {
        throw new Error('File already exists');
    } else {
        data.push(secureObject);
        await writeJSON(dbp, data);
    }
}

/**
 * @name deleteSecureFile
 * @description This function deletes a secure file from the database
 * @async
 * @param {string} file The path to the file
 * @param {string} [dbp=db] The path to the database
 * @returns {Promise<void>}
 * @throws {Error} If the file doesn't exist
 * @example deleteSecureFile('public/OSI-password.png', 'database/passwords.json');
 */
export async function deleteSecureFile(
    file: string,
    dbp: string = db
): Promise<void> {
    const data = await readJSON(dbp);
    const secureObject = data.find((e: any) => e.path === file); //TODO: TYPE THIS
    if (!secureObject) {
        throw new Error('File does not exist');
    } else {
        data.splice(data.indexOf(secureObject), 1);
        await writeJSON(dbp, data);
    }
}

/**
 * @name changePassword
 * @description This function changes the password on a secure file
 * @async
 * @param {string} file The path to the file
 * @param {string} password The new password
 * @param {string} [dbp=db] The path to the database
 * @returns {Promise<void>}
 * @throws {Error} If the file doesn't exist
 * @example changePassword('public/OSI-password.png', 'password', 'database/passwords.json');
 */
export async function changePassword(
    file: string,
    password: string,
    dbp: string = db
): Promise<void> {
    const data = await readJSON(dbp);
    const secureObject = data.find((e: any) => e.path === file); //TODO: TYPE
    if (!secureObject) {
        throw new Error('File does not exist');
    } else {
        await deleteSecureFile(file, dbp);
        await newSecureFile(file, password, dbp);
    }
}

/**
 * @name authenticate
 * @description This function checks if the password is correct
 * @async
 * @param {string} file The path to the file
 * @param {string} password The password to check
 * @param {string} [dbp=db] The path to the database
 * @returns {Promise<boolean>} True if the password is correct, false otherwise
 * @example auth('public/OSI-password.png', 'password', 'database/passwords.json');
 */
export async function authenticate(
    file: string,
    password: string,
    dbp: string = db
) {
    const data = await readJSON(dbp);
    const secureObject = data.find((e: any) => e.path === file); // TODO: TYPE THIS
    if (!secureObject) return false;
    return await verify(secureObject.hash, password + secureObject.salt);
}
