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

    // 1) Obtener SHA y contenido actual
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });
    const fileData = response.data;
    const sha      = fileData.sha;
    const contentB64 = fileData.content;

    // 2) Parsear el JSON actual para conservar "incluye"
    const existing = JSON.parse(Buffer.from(contentB64, "base64").toString("utf8"));

    // 3) Fusionar payload + incluye estático
    const merged = {
      ...payload,
      incluye: existing.incluye,
    };

    // 4) Subir merged
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: "Actualiza menú diario desde función JS",
      content: Buffer.from(JSON.stringify(merged, null, 2)).toString("base64"),
      sha,
      branch,
    });

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