<!-- guide-revision: mission-first-v1 -->

# Flow: construir primero, spec después

**Nuevo.** Flow te permite construir código que funciona junto a un agente antes de saber exactamente qué quieres. Hablas con el agente en la conversación de la misión, él escribe y ejecuta código real en un worktree aislado y no hace falta ninguna spec de entrada. Cuando el resultado es el bueno dices **Esto es**, y un rail deriva la spec y entrega el trabajo como siempre.

## Flow para descubrir, Implement para delegar

Usa [Implement](/docs/pipeline-rails-and-jobs) cuando ya sabes describir el cambio: reglas, criterios de aceptación, una API o un modelo de datos. Acuerda una spec y delégala a un rail.

Usa Flow cuando la forma todavía no está clara: algo exploratorio o visual, una idea que quieres probar antes de comprometerte. Descubres el resultado construyéndolo juntos, y la spec se escribe a partir de lo que construiste.

## Empezar un Flow desde la misión

No tienes que pedir Flow por su nombre. Cuando describes algo exploratorio («quiero probar…», «no sé cómo debería quedar»), la misión muestra una tarjeta con dos caminos: **Flow**, para construirlo juntos ahora, y **Spec + Implement**, para acordar primero una spec. La tarjeta marca el camino recomendado y explica por qué en una frase. El otro camino está siempre a un clic, y el agente no insiste si lo eliges o pulsas **Ahora no**.

Al elegir Flow se abre una confirmación: Specrails crea un worktree aislado donde el agente puede escribir código, y tu rama principal no se toca. Pulsa **Empezar Flow**. En el board aparece una spec provisional con la etiqueta **En Flow**; haz clic en ella para volver a la misión.

## Mantén el control mientras construyes

La conversación cambia de aspecto y aparece una barra de Flow encima del compositor. Muestra la rama del worktree, los ficheros cambiados con líneas añadidas y eliminadas, y el gasto real del Flow según factura el proveedor (nunca una estimación).

- **Ver cambios** lista cada fichero cambiado con su estado y +/−.
- **Pausar** detiene al agente y conserva el worktree y la spec. La misión ofrece entonces **Reanudar Flow**, incluso tras reiniciar la app.
- **Descartar** borra el worktree, su rama y la spec provisional, tras una confirmación.
- **Interrumpe cuando quieras**: escribe mientras el agente trabaja y tu mensaje interrumpe el paso actual. El botón de enviar se convierte en un rayo y el agente sigue al momento con tu nueva información.

Flow solo escribe dentro de su worktree; fuera de Flow, las misiones siguen siendo de solo lectura. Una misión tiene un Flow a la vez.

## Di «Esto es»

Cuando el resultado te convenza, pulsa **Esto es**. La barra de Flow desaparece y aparece la tarjeta de lanzamiento de rail de siempre, con el loop **Flow → Spec** preseleccionado y un rail libre elegido por ti. Ajusta el motor, el modelo o el esfuerzo si quieres y pulsa **Lanzar**. Si se ha alcanzado el límite de revisión o un presupuesto, la tarjeta lo dice y no lanza. **Todavía no** te devuelve al Flow.

El loop Flow → Spec deriva la spec de Specrails y el cambio OpenSpec a partir de lo que construiste, los verifica y los revisa, archiva el cambio y entrega como cualquier ejecución. La tarjeta de entrega aparece en la misión, y el [packet de revisión](/docs/missions-review-and-delivery) muestra qué parte del cambio explica la spec derivada.

## Jira solo en la entrega

Jira no recibe nada mientras estás en Flow ni si lo descartas. En proyectos conectados a [Jira](/docs/integrations-jira-integration), la incidencia se crea solo cuando la entrega llega a revisión, ya completa con la spec derivada, y pasa directamente al estado mapeado como revisión.

## Requisitos

Flow está disponible a partir de la versión de Specrails Desktop que lo introduce y necesita que el Specrails Core integrado en Desktop admita Flow. Si **Empezar Flow** está desactivado, la tarjeta lista lo que falta; actualiza Specrails Core desde **Ajustes de Desktop → Actualizaciones → Specrails Core**. El gasto de Flow aparece en Analítica como superficie propia, **Flow**.
