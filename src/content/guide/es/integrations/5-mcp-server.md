<!-- guide-revision: mission-first-v1 -->

# Da al agente herramientas con contexto

Specrails MCP ofrece herramientas estructuradas de contexto, specs, rails, loops, entregas y observación. El agente de la misión las utiliza para operar con estados registrados.

## Exclusivamente para agentes: conecta tu cliente

Cuando una persona pida al agente conectarse, consulta el [procedimiento de conexión MCP para agentes](https://specrails.dev/for-agents/mcp.md). Cubre Claude Code, Codex CLI y escritorio, Kimi Code y Gemini CLI: localizar el puente incluido, conservar la configuración, verificar la conexión real y diagnosticar fallos. La versión web es Markdown y no necesita JavaScript.

Mantén Specrails en ejecución y abre **Ajustes ▸ MCP ▸ Copiar configuración de cliente**. Algunas versiones devuelven solo `specrails-mcp`, que puede no estar en PATH; el procedimiento explica cómo localizar ejecutable y script. El puente lee el token localmente: no lo copies en la configuración. Registrar no demuestra conexión: completa `initialize`, `tools/list` y una llamada de lectura a `specrails_projects` con `{"action":"list"}`.

## Mantén el alcance de las referencias

El proyecto lógico posee el backlog. Los identificadores de repositorio seleccionan carpetas de código; una spec o ejecución coordinada puede incluir varias. La misma ruta en dos repositorios no es la misma referencia.

Prefiere las herramientas coordinadas de rails y loops para implementar entre repositorios. El lanzamiento directo de jobs se limita al principal y exige seleccionarlo explícitamente en proyectos múltiples; no sirve para modificar cualquier secundario.

## Lee el resultado

Disponer de una herramienta no demuestra éxito. Lee sus errores e identificadores. Consulta el inventario actual en lugar de deducir IDs, rutas o capacidades de una conversación antigua.

La conexión activa puede entregar mensajes promovidos con [Guiar](/docs/missions-steering-and-receipts) en límites seguros entre herramientas cuando no existe entrega nativa. Esto no interrumpe una operación ya iniciada.
