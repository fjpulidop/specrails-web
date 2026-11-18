<!-- guide-revision: mission-first-v1 -->

# Encola, guía e interpreta los checks

Puedes preparar el siguiente mensaje mientras trabaja el agente o guiar expresamente la invocación activa. Enviar y detener son acciones separadas.

## Encola o guía

Enviar durante una ejecución deja el mensaje para el siguiente turno. Los pendientes ofrecen Guiar, borrar y Editar. La edición usa el compositor para conservar referencias, adjuntos y borrador. Cuando la entrega ya está en curso, esas acciones se deshabilitan para no cambiar una entrada que el agente puede haber recibido.

Con Claude y Codex, Guiar utiliza el canal nativo del proveedor. Las otras vías compatibles entregan en puntos seguros del MCP de Specrails; si no llegan a tiempo, continúan en un turno posterior. Guiar no cancela retroactivamente una acción que ya ha empezado.

## Interpreta los recibos

| Icono | Significado |
| --- | --- |
| Un check gris | Enviado; preparando la entrega |
| Dos checks grises | Entrega al transporte confirmada |
| Dos checks verdes | El agente ha confirmado expresamente su lectura |

Pasa el ratón o enfoca el recibo para ver su explicación. Una respuesta posterior no demuestra automáticamente que se leyera la corrección. Una entrega no confirmada no se repite en silencio: revisa el mensaje antes de decidir qué enviar otra vez.

Usa Detener cuando realmente quieras detener la invocación.

## Pregunta sobre una selección

Selecciona texto en una misión y elige **Preguntar sobre esto** para abrir una conversación aparte que lo explica con el contexto previo de la misión. Pulsa Intro sin escribir nada para obtener una explicación, y después haz preguntas de seguimiento. La conversación aparte no se guarda: al cerrarla se descarta, y la misión, su compositor y su sesión del proveedor no cambian. Es una llamada de IA con el proveedor de la misión.

## Vigila la ventana de contexto

Un anillo junto al compositor muestra cuánto se ha llenado el contexto de la sesión del proveedor de la misión, medido después de cada turno. Pasa el ratón o ábrelo para ver los tokens usados, la ventana y el modelo. Si el proveedor no informa la ventana, o justo después de compactar el contexto, el anillo indica que la proporción es desconocida.

Desde el anillo, **Empezar de cero con un resumen** escribe un resumen de la misión (objetivo, decisiones, estado actual y siguientes pasos). Tu siguiente mensaje inicia entonces una sesión nueva del proveedor que solo conoce ese resumen; la conversación sigue en el historial. Está disponible cuando termina el turno en curso, y no mientras la misión está en Intent, que usa su propia sesión.
