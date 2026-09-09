import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

export const AGENT_DOCS = ['mcp.md'];

// Only this explicit allowlist is published; do not copy Desktop's whole docs tree.
export async function syncAgentDocs(projectRoot, check = false, desktopSource) {
  if (desktopSource) {
    // Explicit opt-in import; normal builds never need a sibling repository.
    const sources = await Promise.all(AGENT_DOCS.map(async name => [name,
      await readFile(resolve(desktopSource, 'docs/agents', name), 'utf8')]));
    for (const [name, content] of sources) {
      const target = resolve(projectRoot, 'src/content/for-agents', name);
      if (check) {
        if (await readFile(target, 'utf8') !== content) throw new Error(`Agent source differs from Desktop: ${name}`);
      } else {
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, content);
      }
    }
  }
  const outputs = AGENT_DOCS.map(name => [`public/for-agents/${name}`, null]);
  for (const output of outputs) {
    output[1] = await readFile(resolve(projectRoot, 'src/content/for-agents', output[0].split('/').at(-1)), 'utf8');
    if (!output[1].startsWith('# ')) throw new Error(`Agent runbook needs a title: ${output[0]}`);
  }
  outputs.push(['public/llms.txt', `# Specrails — agent documentation

> Instructions exclusively for agents asked to connect to Specrails Desktop MCP.

Use the local bridge included with the running Desktop app. Configure only the requested client and verify a read-only call. Do not include tokens in configuration or reports.

## Connection runbooks

- [Claude, Codex, Kimi and Gemini — English](https://specrails.dev/for-agents/mcp.md)
- [Agent documentation index](https://specrails.dev/for-agents/index.html)

These static files need no JavaScript. The human product guide is at https://specrails.dev/docs.
`]);
  outputs.push(['public/for-agents/index.html', `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>For agents only — Specrails MCP</title>
  <meta name="description" content="Connect Claude, Codex, Kimi or Gemini to Specrails MCP with verified local setup instructions.">
  <link rel="canonical" href="https://specrails.dev/for-agents/index.html">
  <link rel="alternate" type="text/plain" href="/llms.txt" title="Agent documentation index">
</head>
<body>
  <main>
    <h1>For agents only / Exclusivamente para agentes</h1>
    <p>When asked to connect to Specrails MCP, read the runbook for local discovery, client-specific registration, read-only verification and troubleshooting.</p>
    <p>Cuando te pidan conectar al MCP de Specrails, consulta el procedimiento de descubrimiento local, registro por cliente, verificación de lectura y diagnóstico.</p>
    <ul>
      <li><a href="/for-agents/mcp.md" lang="en">Claude, Codex, Kimi and Gemini — English Markdown</a></li>
    </ul>
    <p>These instructions require no JavaScript. Keep tokens out of configuration and reports.</p>
    <a href="/docs">Human product guide / Guía del producto</a>
  </main>
</body>
</html>
`]);
  for (const [file, expected] of outputs) {
    const path = resolve(projectRoot, file);
    if (check) {
      let actual = '';
      try { actual = await readFile(path, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
      if (actual !== expected) throw new Error(`Outdated ${file}; run npm run docs:sync`);
    } else {
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, expected);
    }
  }
}
