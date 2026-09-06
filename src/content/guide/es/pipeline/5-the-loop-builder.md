<!-- guide-revision: mission-first-v1 -->

# Construye un loop reutilizable

El editor de loops convierte un proceso en pasos conectados y reutilizables. Parte de un loop incluido cuando encaje y adapta las comprobaciones que necesita tu proyecto.

## Define el contrato de cada paso

Usa IA para investigar o implementar, shell para comandos deterministas y deciders para condiciones explícitas de continuación. Conecta rutas de éxito y fallo y configura límites de iteración, tiempo y presupuesto.

Una verificación útil comprueba tanto el build como el comportamiento pedido. La reparación debe resolver el fallo informado: si falta implementación hay que implementarla; un test fallido puede requerir una corrección concreta. No reduzcas cualquier fallo a «poner los tests en verde».

## Configura los repositorios

Selecciona el repositorio de los comandos que dependan de su directorio. Una ejecución coordinada debe incluir todos los objetivos necesarios. Evita comandos que deduzcan otra carpeta fuera del alcance.

Previsualiza el grafo, comprueba las capacidades del proveedor y prueba un cambio acotado antes de reutilizarlo. El nodo final registra el resultado configurado: revisa sus evidencias antes de [aceptar la entrega](/docs/missions-review-and-delivery).
