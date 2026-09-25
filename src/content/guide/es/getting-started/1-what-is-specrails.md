<!-- guide-revision: mission-first-v1 -->

# Qué es Specrails

Specrails es un espacio de trabajo local para convertir una idea de software en una spec precisa, una implementación coordinada y una entrega revisable. Empieza en una conversación de misión; usa el Board cuando quieras organizar el backlog y los carriles de ejecución.

## Tu primer recorrido

1. Instala la aplicación y autentica un proveedor de IA.
2. Añade un proyecto y sus repositorios.
3. Abre una misión, describe el resultado y acuerda la spec.
4. Elige un loop de implementación y sigue sus evidencias.
5. Revisa cada repositorio afectado antes de aceptar la entrega.

Una misión también permite explorar, inspeccionar archivos, usar el navegador y supervisar procesos. La spec recoge qué debe cambiar; el loop define cómo se realiza el trabajo. Son decisiones distintas.

## Dónde se ejecuta cada parte

Specrails es una sola aplicación. Desktop incluye su motor, **Specrails Core**: al añadir un proyecto, Desktop usa Core para preparar los archivos de flujo que necesita tu proveedor, y los loops integrados Implement y Batch Implement usan Core para planificar, desarrollar, verificar y revisar el cambio antes de devolver el resultado a Desktop. Desktop se encarga de todo lo demás: misiones, Board, worktrees, commits, pull requests e historial.

Desktop y Core trabajan a través de la CLI de Claude, Codex, Gemini o Kimi que instalas y autenticas. Que el historial sea local no significa que las llamadas al modelo se queden en tu equipo: los proveedores e integraciones pueden recibir contexto y generar cargos.

## Core viene integrado en Desktop

Core no es un producto aparte. No lo instalas, no lo ejecutas desde una terminal ni lo añades a tus repositorios. Desktop incluye una versión probada; **Ajustes de Desktop → Actualizaciones → Specrails Core** muestra la versión en uso y aplica las actualizaciones de Core a todos tus proyectos.

Esta guía describe el flujo actual del producto. Consulta tu versión y las [notas de lanzamiento](https://github.com/fjpulidop/specrails-desktop/releases) si falta un control.

Continúa con la [instalación](/docs/getting-started-installing-and-first-run) o con [tu primera misión](/docs/missions-first-mission).
