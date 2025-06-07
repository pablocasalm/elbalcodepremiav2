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
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch
    });
    const sha = fileData.sha;

    // 2) Decodificar y parsear el JSON actual para conservar "incluye"
    const existing = JSON.parse(
      Buffer.from(fileData.content, "base64").toString("utf8")
    );

    // 3) Construir el objeto final: todo lo que venga en payload + incluye estático
    const merged = {
      ...payload,
      incluye: existing.incluye
    };

    // 4) Subir merged al repositorio
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: "Actualiza menú diario desde función JS",
      content: Buffer.from(JSON.stringify(merged, null, 2)).toString("base64"),
      sha,
      branch
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: err.status || 500, body: err.message };
  }
};