import { readFile, writeFile } from 'fs/promises';

/**
 * Read JSON file
 *
 * @async
 * @param {string} path - The path to the JSON file
 * @returns {object} - The JSON object
 * @example const data = await readJSON("example.json");
 */
export async function readJSON(path) {
    return JSON.parse(await readFile(path));
}

/**
 * Write JSON file
 *
 * @async
 * @param {string} path - The path to the JSON file
 * @param {object} data - The JSON object
 * @example await writeJSON("example.json", { hello: "world" });
 */
export async function writeJSON(path, data) {
    await writeFile(path, JSON.stringify(data, null, 4));
}
