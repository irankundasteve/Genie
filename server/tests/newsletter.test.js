import test from 'node:test';
import assert from 'node:assert/strict';
import server from '../index.js';

await new Promise((resolve) => server.listen(3100, resolve));

test.after(() => server.close());

test('newsletter endpoint accepts valid email', async () => {
  const response = await fetch('http://localhost:3100/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'valid@genie.ai' })
  });
  assert.equal(response.status, 201);
});

test('newsletter endpoint rejects invalid email', async () => {
  const response = await fetch('http://localhost:3100/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'bad-email' })
  });
  assert.equal(response.status, 400);
});
