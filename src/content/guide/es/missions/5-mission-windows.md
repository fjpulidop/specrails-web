<!-- guide-revision: mission-first-v1 -->

# Mantén una misión en su propia ventana

Las ventanas de misión separadas son una función de la aplicación nativa. Permiten mantener una conversación al lado de la aplicación que pruebas sin iniciar otro agente.

## Mueve la misión

Usa la acción de ventana separada en la cabecera. Specrails traslada el borrador, las referencias, los adjuntos y el estado del espacio de trabajo. Sólo una ventana puede editar la conversación a la vez; la vista original permite enfocarla.

Termina el envío, la subida, la edición o la captura en curso antes de moverla. El traslado espera a que el destino restaure la vista antes de confirmar la propiedad. Si falla mientras sigue viva la ventana de origen, conserva su borrador y reintenta desde el error visible.

## Reintégrala

Usa la acción de reintegrar o cierra la ventana de misión. La principal restaura la conversación antes de cerrar la secundaria. El agente continúa en el mismo backend durante el traslado.

Cerrar la ventana principal la oculta en la bandeja; salir de la aplicación es una operación distinta. Specrails abierto en un navegador no ofrece ventanas nativas de misión. Un cierre completo del sistema no equivale a un traslado fallido: sólo puede recuperarse el estado ya guardado.
