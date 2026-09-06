<!-- guide-revision: mission-first-v1 -->

# Añade un proyecto y sus repositorios

Un proyecto representa un producto con un único backlog compartido. Puede incluir un repositorio, varios repositorios o carpetas adicionales de contexto.

## Crea el proyecto

Abre Añadir proyecto, elige la carpeta principal y ponle un nombre reconocible. Añade las demás carpetas del producto y completa las comprobaciones de requisitos y de Core.

Para un proyecto existente, usa **Ajustes del proyecto → General → Repositorios y carpetas**. Los nombres permiten distinguir rutas como `frontend/src/index.ts` y `api/src/index.ts`; los identificadores estables mantienen separado su contexto.

## Selecciona dónde implementar

Una spec sin selección explícita apunta al repositorio principal. Selecciona todos los repositorios que requiera el cambio antes de lanzarlo. Leer otra carpeta no la convierte en objetivo de implementación. Las carpetas secundarias sin Git aportan contexto, pero no pueden ser objetivos adicionales de implementación aislada.

El backlog y las integraciones pertenecen al proyecto. Añadir una carpeta utilizada en otro proyecto no importa sus tickets ni su relación con Jira.

Continúa con [varios repositorios](/docs/getting-started-multiple-repositories) y [tu primera misión](/docs/missions-first-mission).
