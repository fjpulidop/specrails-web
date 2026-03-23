# Getting Started with specrails-mcp

specrails-mcp is an MCP server that exposes specrails-core knowledge — specs, personas, agent memory, and project config — to any MCP-compatible client.

---

## What is specrails-mcp?

When you use specrails-core with Claude Code or Codex, the agents have direct access to your project's specs, personas, and configuration. But what about other AI tools — Claude Desktop, Cursor, Copilot Chat, Windsurf?

specrails-mcp bridges that gap. It runs as a [Model Context Protocol](https://modelcontextprotocol.io) server and exposes your specrails-core project data as MCP resources and tools. Any MCP-compatible client can read your specs, query agent memory, and run diagnostics.

---

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org) |
| **specrails-core** | installed | A project with specrails-core configured |
| **MCP-compatible client** | — | Claude Desktop, Cursor, Copilot Chat, etc. |

---

## Install

```bash
npm install -g specrails-mcp
```

Or run directly with npx (no global install needed):

```bash
npx specrails-mcp
```

---

## Configure your MCP client

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "specrails": {
      "command": "specrails-mcp",
      "env": {
        "SPECRAILS_ROOT": "/path/to/your/specrails-core-project"
      }
    }
  }
}
```

### Cursor

Add to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "specrails": {
      "command": "specrails-mcp",
      "env": {
        "SPECRAILS_ROOT": "/path/to/your/specrails-core-project"
      }
    }
  }
}
```

### Other MCP clients

Any client that supports the Model Context Protocol can connect to specrails-mcp. Set the `SPECRAILS_ROOT` environment variable to point to your specrails-core project root.

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SPECRAILS_ROOT` | Yes | Absolute path to the specrails-core project root |

---

## Available resources

Once connected, your MCP client can access:

| Resource | Description |
|----------|-------------|
| **Specs** | Read OpenSpec specs and change history |
| **Personas** | Access VPC (Value Proposition Canvas) personas |
| **Memory** | Query agent memory entries |
| **Config** | Read project config (`CLAUDE.md`, `openspec/config.yaml`) |
| **Skills** | Browse provider-agnostic SKILL.md skills |
| **Provider info** | Detect which AI provider is active |

---

## Available tools

| Tool | Description |
|------|-------------|
| **doctor** | Health-check that validates the specrails-core project structure |
| **score-feature** | Score a feature against VPC personas |
| **query-failures** | Analyze failure patterns from agent memory |

---

## Architecture

```
src/
├── index.ts              # Entry point, server bootstrap
├── server.ts             # MCP server configuration
├── resources/            # MCP resource handlers
│   ├── specs.ts          # OpenSpec specs
│   ├── changes.ts        # OpenSpec changes
│   ├── personas.ts       # VPC personas
│   ├── config.ts         # Project config
│   ├── memory.ts         # Agent memory
│   ├── skills.ts         # Provider-agnostic skills
│   └── provider-info.ts  # Provider detection info
├── tools/                # MCP tool handlers
│   ├── doctor.ts         # Health check tool
│   ├── score-feature.ts  # VPC scoring tool
│   └── query-failures.ts # Failure analysis tool
└── utils/
    ├── paths.ts          # Safe path resolution
    ├── validation.ts     # Input validation
    └── provider.ts       # AI provider detection
```

---

## Safety

specrails-mcp operates in **read-only mode**. It never writes to the filesystem. Path traversal is prevented — only files within the `SPECRAILS_ROOT` directory are accessible.

---

## Next steps

| What to explore | Where to go |
|-----------------|-------------|
| Learn about specrails-core | [Core Concepts](concepts.md) |
| Set up specrails-core first | [Getting Started](getting-started.md) |
| Manage multiple projects | [specrails-hub Getting Started](hub-getting-started.md) |

---

*Something not working? Open an issue at [github.com/specrails/specrails-mcp/issues](https://github.com/specrails/specrails-mcp/issues).*
