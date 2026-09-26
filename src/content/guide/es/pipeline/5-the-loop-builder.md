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
