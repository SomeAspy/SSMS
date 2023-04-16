import type { Settings } from '../types/settings.js';
import { readJSON } from './jsonWorker.js';

const settings: Settings = await readJSON<Settings>('config.json');

/**
 * @name blacklisted
 * @description This function checks if a file is blacklisted
 * @param path The path to the file
 * @returns If the file is blacklisted
 */
export async function blacklisted(path: string): Promise<boolean> {
    return new Promise((resolve) => {
        const blacklist = settings.blacklist;
        const regex = new RegExp(blacklist.regex);
        const extension = path.split('.').pop();
        if (extension) {
            if (blacklist.extensions.includes(extension)) resolve(true);
        }
        if (blacklist.regex) {
            if (regex.test(path)) resolve(true);
        }
        resolve(false);
    });
}
