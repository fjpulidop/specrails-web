<!-- guide-revision: mission-first-v1 -->

# Intent: di el problema, no la solución

**Intent** es la forma de empezar un trabajo en Specrails. En lugar de escribir una solución, escribes el **intent**: el problema, el resultado que buscas, cómo sabrás que funcionó, a quién y a qué afecta, los límites y lo que nadie sabe todavía. Specrails deriva la spec a partir de él y tú revisas la spec en lugar de escribirla. (Intent es el nuevo nombre de lo que antes se llamaba Flow, y conserva todo lo que Flow hacía.)

## El intent

Un intent tiene seis partes y ninguna para la solución:

| Parte | Qué contiene |
| --- | --- |
| **Problema** | Qué falla hoy, para quién y cuándo duele |
| **Resultado buscado** | Qué es cierto cuando se resuelve, con una hipótesis opcional |
| **Cómo sabremos** | Señales observables; se convierten en criterios de aceptación |
| **A quién y a qué afecta** | Personas, pantallas o sistemas |
| **Restricciones** | Límites que toda solución debe respetar |
| **Preguntas abiertas** | Lo que nadie sabe todavía; los agentes lo investigan en lugar de adivinar |

Si nombras una solución («añade una caché Redis»), el intent conserva para qué sirve («la API responde en menos de 200 ms») como resultado. Tu solución pasa a ser una restricción si la exiges, o una pregunta abierta si es una opción más. Un intent se queda en Specrails y nunca se envía a Jira.

## De dónde sale un intent

- **En una misión.** Cuando describes un trabajo, el agente te entrevista sobre los usuarios, los límites y cómo sabrás que funcionó, y muestra una tarjeta **Intent** con todas las partes y, si la petición es ambigua, dos lecturas de ella. Pulsa una lectura o responde con tus palabras.
- **En Añadir spec.** **Intent** es el primer modo y se abre por defecto. Describe el problema, pulsa **Generar intent y spec** y revisa ambos. Consulta los [modos de Añadir spec](/docs/specs-specs-and-the-backlog).

Todo agente que trabaja en la spec recibe primero el intent, como fuente de verdad del porqué y del resultado, nunca del cómo. Cuando un rail entrega una spec con intent, se escribe como `intent.md` en el cambio OpenSpec, de modo que vive en Git junto al código.

## Explorar o Delegar

Un intent asentado ofrece dos caminos iguales. Ninguno es el recomendado; decides tú.

- **Explorar** lo construye contigo un agente en una sesión Intent aislada. Cuando el resultado es el bueno, un rail deriva la spec de lo que construisteis. Úsalo cuando la forma aún no está clara: algo exploratorio o visual.
- **Delegar** hace que el agente escriba la spec a partir del intent. La revisas y un rail la construye con [Implement](/docs/pipeline-rails-and-jobs). Úsalo cuando lo que quieres ya está claro.

## Inicia una sesión Intent

Elige **Explorar**. Se abre una confirmación: Specrails crea un worktree aislado donde el agente puede escribir código, y tu rama principal no se toca. Pulsa **Empezar Intent**. Una spec provisional con tu intent aparece en el board con la etiqueta **En Intent**; haz clic para volver a la misión. También puedes empezar cualquier spec existente en Intent con **Empezar en Intent**, en el board o en el detalle de la spec.

## Mantén el control mientras construyes

Una barra sobre el compositor muestra la rama del worktree, los archivos cambiados con líneas añadidas y quitadas, y el coste real facturado por el proveedor (nunca una estimación).

- **Ver cambios** lista cada archivo cambiado con su estado y sus +/−.
- **Pausar Intent** detiene al agente y conserva el worktree y la spec. La misión ofrece entonces **Reanudar Intent**, incluso tras reiniciar la app.
- **Descartar** elimina el worktree, su rama y la spec provisional, tras una confirmación. Una spec que ya existía vuelve exactamente como estaba.
- **Interrumpe cuando quieras**: escribe mientras el agente trabaja y tu mensaje interrumpe el paso actual.

Intent solo escribe dentro de su worktree; fuera de Intent, las misiones son de solo lectura. Una misión tiene un Intent a la vez.

## Pasar a un rail

Cuando el resultado te convence, pulsa **Pasar a un rail**. La fila dice **Listo para convertirse en una PR**, con rail, motor, modelo y esfuerzo ya elegidos. Ajústalos si quieres y pulsa **Lanzar**, o **Todavía no** para volver. Si se alcanza el límite de revisión o un presupuesto, la línea lo indica y no se lanza nada.

El rail deriva la spec y el cambio OpenSpec de lo que construiste, los verifica y revisa, archiva el cambio y entrega como cualquier ejecución. La tarjeta de entrega aparece en la misión, y el [paquete de revisión](/docs/missions-review-and-delivery) muestra cuánto del cambio explica la spec derivada. Si la ejecución falla por una causa técnica, el trabajo vuelve al Intent intacto.

## Jira solo en la entrega

Nada llega a Jira mientras estás en Intent ni si lo descartas. En proyectos conectados a [Jira](/docs/integrations-jira-integration), la incidencia se crea solo cuando la entrega llega a revisión, ya completa con la spec derivada.

## Requisitos

Intent necesita que el Specrails Core integrado en Desktop lo soporte. Si **Empezar Intent** está desactivado, la tarjeta lista lo que falta; actualiza Specrails Core desde **Ajustes de Desktop → Actualizaciones → Specrails Core**. El coste de Intent aparece en Analítica como superficie propia, **Intent**.
