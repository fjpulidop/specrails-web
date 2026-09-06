<!-- guide-revision: mission-first-v1 -->

# Inspecciona la ejecución antes de reintentar

El detalle de ejecución reúne pasos, logs, verificación y entrega. Empieza aquí cuando una implementación se detiene o necesitas entender el resultado.

## Localiza el fallo real

Lee el paso y su error antes de reiniciar. Distingue requisitos ausentes, cuota o autenticación, fallos de comandos, criterios incumplidos y conflictos de entrega. El último párrafo del modelo no sustituye al estado registrado.

Abre los logs y el diff del repositorio. Busca los comandos ejecutados, su resultado y las verificaciones omitidas. Los costes y tokens pueden ser estimados o no estar disponibles.

## Continúa el trabajo correcto

Usa la acción de reintento o revisión de esa ejecución. No lances varias implementaciones idénticas porque tarde en reconectar una vista: comprueba primero el estado.

Una revisión debe conservar la spec congelada y su contexto de entrega. Para otro alcance, actualiza el backlog y lanza de nuevo. Conserva el identificador y los logs relevantes al [informar de un problema](/docs/settings-pipeline-telemetry-and-diagnostics).
