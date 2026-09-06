<!-- guide-revision: mission-first-v1 -->

# Inspecciona procesos y logs guardados

Abre Procesos en una misión guardada para inspeccionar servicios activos y su historial. Los terminados siguen accesibles cuando desaparecen sus chips temporales del compositor.

## Localiza el proceso

Busca en el historial y comprueba comando, repositorio, directorio y hora de inicio. Abre los logs para ver stdout y stderr, filtrar o buscar, pausar el seguimiento y copiar o descargar la instantánea disponible.

El historial sobrevive a recargas y reconexiones cuando funciona la persistencia. Tiene límites de edad, cantidad y tamaño; no es una grabación ilimitada. Deben indicarse el truncamiento y los errores de guardado.

## Detén con confirmación

Detener utiliza la identidad registrada, no sólo un PID que podría haberse reutilizado. Durante la confirmación se mantiene el estado deteniendo. Un error puede reintentarse sin fingir que el servicio desapareció.

Después de reiniciar Desktop, **Desconectado** indica que se interrumpió la supervisión. El estado del proceso en el sistema puede ser desconocido: Specrails no adopta ni mata un PID antiguo como si aún le perteneciera. Borrar una misión o proyecto también elimina su historial.
