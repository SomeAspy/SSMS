import { server, start } from "./functions/server.js";

export const paths = ["./public"];


server.get("/", async (request, reply) => {
    return { hello: "world" };
});

await start();
