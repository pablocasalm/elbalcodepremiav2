// netlify/functions/update-daily.js
import { Octokit } from "@octokit/rest";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body);
    if (payload.tipo !== "daily") {
      return { statusCode: 400, body: "Invalid menu tipo" };
    }

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const owner  = process.env.GITHUB_OWNER;
    const repo   = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH;
    const path   = "public/menu-daily.json";

    // 1) Leer el fichero (GET /repos/{owner}/{repo}/contents/{path})
    const getRes = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      { owner, repo, path, ref: branch }
    );
    const fileData  = getRes.data;
    const sha       = fileData.sha;
    const contentB64 = fileData.content;

    // 2) Mantener “incluye” del JSON actual
    const existing = JSON.parse(Buffer.from(contentB64, "base64").toString("utf8"));

    // 3) Fusionar payload + incluye
    const merged = {
      ...payload,
      incluye: existing.incluye,
    };

    // 4) Empujar los cambios (PUT /repos/{owner}/{repo}/contents/{path})
    await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path,
        message: "Actualiza menú diario desde función JS",
        content: Buffer.from(JSON.stringify(merged, null, 2)).toString("base64"),
        sha,
        branch,
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.status || 500,
      body: JSON.stringify({
        errorType: err.name,
        errorMessage: err.message,
        stack: err.stack,
      }),
    };
  }
};