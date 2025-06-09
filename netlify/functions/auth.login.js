// netlify/functions/auth-login.js
export const handler = async ({ httpMethod, body }) => {
    if (httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }
  
    const { user, pass } = JSON.parse(body);
    const ADMIN_USER     = process.env.ADMIN_USER;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const ADMIN_TOKEN    = process.env.ADMIN_TOKEN; // el mismo token que pones en VITE_ADMIN_TOKEN
  
    if (user === ADMIN_USER && pass === ADMIN_PASSWORD) {
      return {
        statusCode: 200,
        body: JSON.stringify({ token: ADMIN_TOKEN })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Credenciales inválidas' })
      };
    }
  };