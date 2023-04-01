import { createHash, randomBytes } from 'crypto'
function hash512(text) {
    return createHash("sha512").update(text).digest("hex");
}

function makeSalt() {
    return randomBytes(64).toString("hex");
}

function buildObject(file, password) {
    const salt = makeSalt();
    return {
        path: file,
        hash: hash512(password + salt),
        salt: salt
    }
}

console.log(buildObject("test.txt", "password"));
