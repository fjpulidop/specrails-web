<!-- guide-revision: mission-first-v1 -->

# Un proyecto, varios repositorios

Usa una spec compartida cuando una función atraviese varios repositorios, por ejemplo un endpoint y el cliente que lo consume.

## Define los límites

Añade los repositorios al mismo proyecto, ponles nombre y elige su rama de integración. Selecciona los afectados en la spec. Las specs antiguas sin alcance explícito usan el principal. Un lanzamiento puede añadir alcance, pero no omitir un repositorio requerido por sus specs.

Antes de ejecutar se preparan los worktrees Git de los repositorios seleccionados. Cada referencia de archivo y cada entrega conservan su identidad. Los pasos shell personalizados deben indicar el repositorio en ejecuciones con varios repositorios.

## Acepta el cambio completo

La tarjeta de entrega muestra una sección por repositorio. Revísalos e intégralos por separado. La spec compartida termina cuando se aceptan todas las entregas requeridas, incluidos los resultados explícitos sin cambios. Si una integración funciona y otra falla, se conserva la primera; resuelve y reintenta la pendiente.

Git no convierte varios repositorios en una transacción atómica. Que uno esté correcto no significa que toda la función esté entregada.

No se puede mover o separar un repositorio mientras haya specs o trabajo activo que lo referencien. Separarlo nunca borra sus archivos. Consulta las [decisiones de entrega](/docs/missions-review-and-delivery).
