// netlify/functions/update-musicdates.js
export const handler = async ({ httpMethod, body }) => {
    if (httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
  
    try {
      const payload = JSON.parse(body);
      if (payload.tipo !== "music") {
        return { statusCode: 400, body: "Invalid menu tipo" };
      }
  
      const owner  = process.env.GITHUB_OWNER;
      const repo   = process.env.GITHUB_REPO;
      const branch = process.env.GITHUB_BRANCH;
      const token  = process.env.GITHUB_TOKEN;
      const path   = "public/music-dates.json";
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  
      // 1) Leer el JSON existente
      const getRes = await fetch(`${apiUrl}?ref=${branch}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "netlify-function"
        }
      });
      if (!getRes.ok) throw await getRes.json();
      const fileData = await getRes.json();
      // 2) Construir el nuevo contenido
      const newContent = {
        timestamp: new Date().toISOString(),
        tipo: "music",
        dates: payload.dates
      };
      // 3) Subirlo de nuevo
      const putRes = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "netlify-function",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: "Actualiza musicDates desde función JS",
          content: Buffer.from(JSON.stringify(newContent, null, 2)).toString("base64"),
          sha: fileData.sha,
          branch
        })
      });
      if (!putRes.ok) throw await putRes.json();
  
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