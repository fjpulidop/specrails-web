<!-- guide-revision: mission-first-v1 -->

# Coordina un lote de specs

Batch Implement coordina varias specs guardadas en un plan de ejecución. Úsalo para trabajo relacionado cuyas dependencias y repositorios ya estén claros.

## Prepara el lote

Selecciona las specs, revisa sus criterios y confirma la unión de repositorios objetivo. Ordena las dependencias: una tarea de interfaz puede depender del contrato de una API aunque estén en repositorios distintos.

No uses el lote para ocultar requisitos sin resolver. Explóralos primero. Compartir repositorio puede exigir trabajo secuencial aunque las tareas parezcan independientes.

## Revisa el resultado completo

La ejecución conserva las specs y su alcance. Sigue tanto los pasos como el resultado global; una implementación parcial no completa el lote.

Revisa cada repositorio y el comportamiento conjunto. La verificación debe corresponder al candidato entregado e incluir sus contratos. Si un repositorio necesita una corrección, conserva las entregas aceptadas y reintenta lo pendiente desde el grupo.

Lee [proyectos con varios repositorios](/docs/getting-started-multiple-repositories) antes de integrar un lote que cruce repositorios.
