import {dirname} from "path";
import {fileURLToPath} from "url";
import {test, expect} from "@jest/globals";
import {writeJSON, readJSON} from "../src/functions/jsonWorker.js";

const _dirname = dirname(fileURLToPath(import.meta.url));

const testFile = _dirname + "/../testFiles/test.jsonWorker.json";

test("WriteJSON", async () => {
    await writeJSON(testFile, {hello: "world"});
    await import(testFile).then((data: {default: {hello: string}}) => {
        expect(data.default.hello).toBe("world");
    });
});

test("ReadJSON", async () => {
    await expect(readJSON<{hello: string}>(testFile)).resolves.toEqual({
        hello: "world"
    });
});
