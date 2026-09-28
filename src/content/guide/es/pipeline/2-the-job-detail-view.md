<!-- guide-revision: mission-first-v1 -->

# Inspecciona la ejecución antes de reintentar

El detalle de ejecución reúne pasos, logs, verificación y entrega. Empieza aquí cuando una implementación se detiene o necesitas entender el resultado.

## Localiza el fallo real

Lee el paso y su error antes de reiniciar. Distingue requisitos ausentes, cuota o autenticación, fallos de comandos, criterios incumplidos y conflictos de entrega. El último párrafo del modelo no sustituye al estado registrado.

Abre los logs y el diff del repositorio. Busca los comandos ejecutados, su resultado y las verificaciones omitidas. Los costes y tokens pueden ser estimados o no estar disponibles.

## Continúa el trabajo correcto

Usa la acción de reintento o revisión de esa ejecución. No lances varias implementaciones idénticas porque tarde en reconectar una vista: comprueba primero el estado.

Una revisión debe conservar la spec congelada y su contexto de entrega. Para otro alcance, actualiza el backlog y lanza de nuevo. Conserva el identificador y los logs relevantes al [informar de un problema](/docs/settings-pipeline-telemetry-and-diagnostics).

## Reanudar la ejecución original

Las ejecuciones guardadas conservan su workflow, alcance de repositorios y contexto de entrega originales. Responde a una pregunta pendiente o aprueba explícitamente la operación mostrada. Tras una escritura interrumpida, revisa primero el diff del worktree y selecciona los intentos exactos que quieres recuperar. El nodo y el ámbito distinguen las ramas que pasaron por el mismo paso. Reanudar conserva la ejecución y su contabilidad.

La confirmación de cancelación indica que la solicitud quedó registrada; espera a que termine la ejecución antes de iniciar trabajo concurrente sobre ella. Los recibos de instrucciones distinguen una instrucción aceptada de otra consumida por un intento posterior del agente. Ningún recibo demuestra que el cambio solicitado haya terminado. Un coste desconocido no equivale a coste cero.

## Después de reiniciar un workflow

Tras una caída, reanuda el workflow guardado con su configuración y repositorios originales. Una escritura interrumpida exige seleccionar el intento exacto después de revisar el diff del worktree. Los pasos completados se conservan. Una llamada al proveedor cuya respuesta se perdió sigue contabilizada como interrumpida y con consumo desconocido; nunca se presenta como gratuita. Si los registros guardados no permiten demostrar la entrega original, la recuperación muestra un error y conserva el worktree.

Cuando un paso de decisión se detiene para preguntar, la reanudación reutiliza la decisión guardada y transmite la respuesta humana al siguiente paso. No vuelve a llamar al modelo para esa misma decisión. Un prompt pausado sí puede necesitar otro turno del modelo para aplicar tu respuesta.

## Conservación del historial

Las ejecuciones guardadas se conservan indefinidamente por defecto. En **Ejecuciones guardadas → Conservación del historial**, un proyecto puede conservarlas entre 1 y 3650 días. Nada se borra en segundo plano: guarda la política, elige **Previsualizar limpieza** y revisa cada ejecución y su motivo antes de **Eliminar historial caducado**. Una ejecución sigue protegida mientras está activa, espera tu respuesta o aprobación, tiene una escritura interrumpida, una entrega abierta o un fork que aún depende de ella. Solo se elimina el historial de ejecución dentro del almacenamiento de Specrails del proyecto; tu repositorio, los worktrees, el log del job y los registros de coste se conservan. Una ejecución caducada aparece como **Caducado** y ya no se puede reanudar ni bifurcar. Las versiones de Core que aún usa una ejecución conservada nunca se eliminan.
