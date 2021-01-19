import { onSignal, serve } from "./deps.ts";

const server = serve({ hostname: "0.0.0.0", port: parseInt(Deno.env.get("PORT") || "8080") });
console.log("Starting...");

const decoder = new TextDecoder();

const run = async () => {
  for await (const req of server) {
    const buf: Uint8Array = await Deno.readAll(req.body);
    const body = decoder.decode(buf);
    const reqj = {
      method: req.method,
      path: req.url,
      headers: Object.fromEntries(req.headers.entries()),
      body,
    };
    console.log(`${JSON.stringify(reqj)}`);
    req.respond({ status: 200, body: "OK" });
  }
};

const exit = () => {
  console.log("Stopping...");
  server.close();
  console.log("Bye!");
  Deno.exit();
};

onSignal(Deno.Signal.SIGINT, exit);
onSignal(Deno.Signal.SIGTERM, exit);
onSignal(Deno.Signal.SIGQUIT, exit);

console.log("Running...");

await run();
