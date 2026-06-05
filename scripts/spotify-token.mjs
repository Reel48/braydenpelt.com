#!/usr/bin/env node
/**
 * One-time helper to get a Spotify refresh token.
 *
 * Prereqs:
 *   1. Create an app at https://developer.spotify.com/dashboard
 *   2. Add redirect URI: http://127.0.0.1:8888/callback
 *   3. Put SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local
 *
 * Run:  pnpm spotify:token
 * Then paste the printed refresh token into .env.local as SPOTIFY_REFRESH_TOKEN.
 */
import http from "node:http";
import { readFileSync } from "node:fs";
import { exec } from "node:child_process";

function loadEnvLocal() {
  try {
    const txt = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of txt.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* no .env.local — rely on process env */
  }
}
loadEnvLocal();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const SCOPES = [
  "user-top-read",
  "user-read-recently-played",
  "user-read-currently-playing",
  "playlist-read-private",
].join(" ");

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET. Add them to .env.local first.",
  );
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
  }).toString();

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, REDIRECT_URI);
  if (u.pathname !== "/callback") {
    res.writeHead(404);
    res.end();
    return;
  }
  const code = u.searchParams.get("code");
  if (!code) {
    res.writeHead(400);
    res.end("No authorization code received.");
    return;
  }
  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });
    const data = await tokenRes.json();
    if (!data.refresh_token) {
      res.writeHead(500);
      res.end("No refresh token in response. Check the console.");
      console.error(data);
      server.close();
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>✅ Done — you can close this tab.</h1>");
    console.log(
      "\n✅ SPOTIFY_REFRESH_TOKEN=" +
        data.refresh_token +
        "\n\nAdd that line to .env.local (and Vercel env vars).\n",
    );
    server.close();
  } catch (e) {
    res.writeHead(500);
    res.end("Token exchange failed.");
    console.error(e);
    server.close();
  }
});

server.listen(8888, "127.0.0.1", () => {
  console.log("\nOpening Spotify authorization in your browser…");
  console.log("If it doesn't open, visit:\n\n" + authUrl + "\n");
  exec(`open "${authUrl}"`);
});
