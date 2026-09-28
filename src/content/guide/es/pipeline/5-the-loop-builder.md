<!-- guide-revision: mission-first-v1 -->

# Construye un loop reutilizable

El editor de loops convierte un proceso en pasos conectados y reutilizables. Parte de un loop incluido cuando encaje y adapta las comprobaciones que necesita tu proyecto.

## Define el contrato de cada paso

Usa IA para investigar o implementar, shell para comandos deterministas y deciders para condiciones explícitas de continuación. Conecta rutas de éxito y fallo y configura límites de iteración, tiempo y presupuesto.

Una verificación útil comprueba tanto el build como el comportamiento pedido. La reparación debe resolver el fallo informado: si falta implementación hay que implementarla; un test fallido puede requerir una corrección concreta. No reduzcas cualquier fallo a «poner los tests en verde».

## Configura los repositorios

Selecciona el repositorio de los comandos que dependan de su directorio. Una ejecución coordinada debe incluir todos los objetivos necesarios. Evita comandos que deduzcan otra carpeta fuera del alcance.

Previsualiza el grafo, comprueba las capacidades del proveedor y prueba un cambio acotado antes de reutilizarlo. El nodo final registra el resultado configurado: revisa sus evidencias antes de [aceptar la entrega](/docs/missions-review-and-delivery).

## Componer y validar el grafo

Usa el catálogo disponible en tu versión de Desktop. Arrastra los pasos al lienzo, conecta sus resultados y configura cada paso en su inspector. Valida el grafo antes de publicarlo y corrige los errores de nodos y parámetros antes de ejecutarlo. Specrails Core es el motor integrado en Desktop que ejecuta estos workflows. Su versión se gestiona en Ajustes de Desktop → Actualizaciones → Specrails Core.

Da a cada rol solo el acceso que necesita. Separa la investigación de solo lectura de los cambios de código y conecta los cambios con una verificación explícita. Las ramas paralelas comparten el presupuesto del workflow; llegar a un nodo End con éxito no demuestra por sí solo que un workflow de escritura tenga evidencia verificada.

Cuando el Core seleccionado expone límites por invocación, las piezas de prompt, rol y decider ofrecen `timeoutMs` e `idleTimeoutMs`. Usa `0` para desactivar ese temporizador del paso, o elimina el campo para heredar el valor predeterminado. Los presupuestos del workflow completo y la cancelación siguen activos. Si una verificación plantea una pregunta bloqueante, espera tu respuesta antes de aceptar un resultado correcto.

Cuando un grafo antiguo guardado se sustituye por primera vez por piezas de Core, se conserva el grafo original. La biblioteca ofrece entonces **Exportar grafo original**. La exportación tiene un nombre distinto para poder importarla como un borrador independiente sin sustituir el workflow actual. La conversión y las ediciones posteriores nunca publican el loop automáticamente.

Usa **Asignar variables** para conservar estado durante una pausa: asigna valores JSON tipados o ajusta un contador entero existente. Esta pieza no realiza llamadas a la IA. Las actualizaciones se guardan juntas; un contador inválido deja todas las variables intactas. Las variables de un componente mapeado permanecen dentro de ese componente.

En un Decider, **Continuar mientras se cumpla esta condición** protege el trabajo obligatorio pendiente. Por ejemplo, `$vars.failedPass == true` convierte una propuesta de detenerse en continuar hasta que el workflow quite esa marca. La decisión se ejecuta igualmente y el trabajo repetido sin cambios sigue sujeto al límite de falta de progreso. Las preguntas humanas siguen pausando la ejecución hasta recibir respuesta.

Para migrar un loop guardado del motor anterior, elige **Convertir a Core** en la biblioteca. Selecciona el repositorio original si un paso shell no tiene un ámbito explícito. La conversión valida el grafo y guarda un borrador con una copia exportable del original. Revisa las conexiones y publica explícitamente. No se pueden convertir loops en ejecución; se conservan las ediciones en conflicto. Los pasos que escriben requieren comandos reales de verificación y Quick SDD utiliza el OpenSpec incluido en Core. Actualiza Core si la conversión no está disponible.

Para ver qué loops guardados necesitan atención, abre **Comprobación de migración a Core** en la biblioteca de loops y elige **Comprobar**. Muestra los loops que el Core instalado rechaza, los que están listos para convertir y los que necesitan un repositorio u otro arreglo. Nunca convierte ni publica nada por su cuenta.
