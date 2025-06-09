// netlify/functions/update-daily.js
export const handler = async ({ httpMethod, body }) => {
  if (httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(body);
    if (payload.tipo !== "daily") {
      return { statusCode: 400, body: "Invalid menu tipo" };
    }

    const owner  = process.env.GITHUB_OWNER;
    const repo   = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH;
    const token  = process.env.GITHUB_TOKEN;
    console.log("–– DEBUG ENV ––", {
      owner,
      repo,
      branch,
      tokenExists: Boolean(token)
    });
    //const owner  = process.env.GITHUB_OWNER;
    //const repo   = process.env.GITHUB_REPO;
    //const branch = process.env.GITHUB_BRANCH;
    const path   = "public/menu-daily.json";
    //const token  = process.env.GITHUB_TOKEN;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    // 1) Leer contenido
    const getRes = await fetch(`${apiUrl}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "netlify-function"
      }
    });
    if (!getRes.ok) throw await getRes.json();
    const fileData = await getRes.json();
    const existing = JSON.parse(Buffer.from(fileData.content, "base64").toString("utf8"));

    // 2) Fusionar y re-subir
    const mergedContent = {
      ...payload,
      incluye: existing.incluye
    };
    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "netlify-function",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Actualiza menú diario desde función JS",
        content: Buffer.from(JSON.stringify(mergedContent, null, 2)).toString("base64"),
        sha: fileData.sha,
        branch
      })
    });
    const result = await putRes.json();
    if (!putRes.ok) throw result;

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(err);
    const code = parseInt(err.status) || parseInt(err.statusCode) || 500;
    return {
      statusCode: code,
      body: JSON.stringify({
        errorType: err.name || "Error",
        errorMessage: err.message || err,
        details: err
      })
    };
  }
};