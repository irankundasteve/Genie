import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const emails = new Set();

function json(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function app(req, res) {
  if (req.method === 'POST' && req.url === '/api/newsletter') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      const { email } = body ? JSON.parse(body) : {};
      if (!email || !emailRegex.test(email)) return json(res, 400, { error: 'Invalid email format.' });
      if (emails.has(email.toLowerCase())) return json(res, 409, { error: 'Email already subscribed.' });
      emails.add(email.toLowerCase());
      return json(res, 201, { message: 'Subscribed successfully.' });
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/status') {
    return json(res, 200, { service: 'Genie API', uptime: 'operational' });
  }

  const filePath = req.url === '/' ? path.join(publicDir, 'index.html') : path.join(publicDir, req.url);
  if (filePath.startsWith(publicDir) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript'
    };
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
}

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3001;
  server.listen(port, () => console.log(`Genie listening on ${port}`));
}

export default server;
