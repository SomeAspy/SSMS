import {readFile, writeFile} from "fs/promises";

/**
 * @name readJSON
 * @description Read JSON files
 * @async
 * @param path - The path to the JSON file
 * @example const data = await readJSON<SecureObjects>("example.json");
 */
export async function readJSON<T>(path: string): Promise<T> {
    return JSON.parse(await readFile(path, {encoding: "utf-8"})) as T;
}

/**
 * @name writeJSON
 * @description Write JSON files (Blanks them)
 * @async
 * @param path - The path to the JSON file
 * @param data - The JSON object
 * @example await writeJSON("example.json", { hello: "world" });
 */
export async function writeJSON(path: string, data: object): Promise<void> {
    await writeFile(path, JSON.stringify(data, null, 4));
}
