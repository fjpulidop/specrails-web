<!-- guide-revision: mission-first-v1 -->

# Qué datos debes respaldar

Los repositorios y los registros locales de Specrails son partes distintas del espacio de trabajo. Respalda ambas para protegerlo o trasladarlo.

## Conserva las dos capas

El código sigue en las carpetas registradas. Specs, artefactos del runtime, worktrees e historial pueden tener ubicaciones gestionadas diferentes. El directorio de datos por defecto es `~/.specrails`; una configuración explícita puede cambiarlo.

Un proyecto con varios repositorios conserva un backlog y una identidad de integración, con miembros separados. Añadir una carpeta no importa el historial de otro proyecto.

## Mueve o elimina con contexto

Antes de trasladar un repositorio o borrar un proyecto, revisa ejecuciones, entregas e historial de procesos. Quitar una carpeta del proyecto no debe borrar sus fuentes, pero eliminar registros puede eliminar su historial.

Detén la aplicación antes de restaurar manualmente una base de datos. Conserva la copia original hasta comprobar proyectos y rutas. No resuelvas un error de arranque borrando el directorio sin saber qué contiene.
