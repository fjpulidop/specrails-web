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


## Interpretar el resultado de Implement

Con un runtime de Core que admita evidencia de aceptación, el resultado muestra cuatro
estados separados: implementación, validación, archivo y entrega. «Verificada con
excepciones» conserva las interpretaciones aceptadas y los checks complementarios
fallidos o no disponibles. «Pendiente del host» indica que Core no ha realizado la
entrega que corresponde al host, aunque el cambio ya esté archivado.

Abre **Evidencia, excepciones y tiempos por fase** para consultar decisiones,
referencias de aprobación, alcance y limitaciones de las mediciones, conclusiones de
revisión y tiempos registrados. Los checks obligatorios fallidos y los requisitos
sin resolver bloquean la aceptación. Un benchmark de Node no demuestra el rendimiento
de renderizado del navegador. Los cambios materiales requieren autorización previa
del usuario o del host; el reviewer puede aceptar interpretaciones menores dejando
constancia de su motivo e impacto.

El éxito de ejecución describe el proceso. Si el runtime informa de implementación
incompleta o validación bloqueada/pendiente, Desktop cierra el run como bloqueado y
no completa sus tickets. Con runtimes antiguos o no disponibles, la evidencia aparece
como no disponible: el éxito del proceso por sí solo no prueba la aceptación.
El resultado se registra al terminar; no revalida modificaciones posteriores.

Los contadores distinguen pasos ejecutados, evaluaciones del decider y turnos del
agente. Un Implement integrado puede tener un paso, cero evaluaciones y muchos turnos.
Se muestran tiempos e intentos por fase de Core cuando están registrados; el coste por
fase no está disponible porque el consumo se atribuye a pasos del loop. Los receipts
completos se reutilizan mientras sus entradas sigan vigentes: cada fase no necesita
repetir la misma suite completa.
