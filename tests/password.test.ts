import {dirname} from "path";
import {fileURLToPath} from "url";
import {test, expect} from "@jest/globals";
import {
    authenticate,
    newSecureFile,
    deleteSecureFile,
    changePassword
} from "../src/functions/password.js";
import {writeJSON} from "../src/functions/jsonWorker.js";

const _dirname = dirname(fileURLToPath(import.meta.url));

const testDB = _dirname + "/../testFiles/test.passwords.json";

await writeJSON(testDB, []);

await newSecureFile("public/OSI-password.png", "PassWord", testDB);

test("AuthFailure", async () => {
    expect(
        await authenticate("public/OSI-password.png", "badPass", testDB)
    ).toBe(false);
});

test("AuthSuccess", async () => {
    expect(
        await authenticate("public/OSI-password.png", "PassWord", testDB)
    ).toBe(true);
});

test("AuthNonExistent", async () => {
    expect(await authenticate("NonExistent", "PassWord", testDB)).toBe(false);
});

test("NewSecureFile", async () => {
    await newSecureFile("NewFile.bat", "PassWord", testDB);
    expect(await authenticate("NewFile.bat", "PassWord", testDB)).toBe(true);
});

test("NewSecureFileDuplicate", async () => {
    await expect(
        newSecureFile("NewFile.bat", "PassWord", testDB)
    ).rejects.toThrow("File already exists");
});

test("RemoveSecureFile", async () => {
    await deleteSecureFile("NewFile.bat", testDB);
    expect(await authenticate("NewFile.bat", "PassWord", testDB)).toBe(false);
});

test("RemoveSecureFileNonexistent", async () => {
    await expect(deleteSecureFile("Nonexistent", testDB)).rejects.toThrow(
        "File does not exist"
    );
});

test("ChangePassword", async () => {
    await changePassword("public/OSI-password.png", "HelloWorld", testDB);
    expect(
        await authenticate("public/OSI-password.png", "HelloWorld", testDB)
    ).toBe(true);
});

test("ChangePasswordNonexistent", async () => {
    await expect(
        changePassword("Nonexistent", "NewPassword", testDB)
    ).rejects.toThrow("File does not exist");
});
