<!-- guide-revision: mission-first-v1 -->

# Revisa y entrega el cambio

Una implementación produce evidencias y una decisión de entrega. Revisa el diff real y la verificación de cada repositorio antes de llevar el trabajo a tu carpeta habitual o a una pull request.

## Distingue las acciones

| Acción | Qué comprobar |
| --- | --- |
| Integrar en local | La rama de integración y cualquier conflicto o cambio de base |
| Hacer checkout del trabajo | La rama revisada se trasladará a la carpeta local de ese repositorio |
| Crear o publicar una PR | Repositorio, rama base, diff y autenticación disponible en GitHub |
| Pedir una revisión | Se mantienen como referencia el alcance congelado y la entrega anterior |

Hacer checkout no equivale a aceptar la spec compartida. Un worktree es una carpeta de trabajo aislada de Git; no es un espacio alojado en GitHub. Las acciones conservan el repositorio y la revisión para los que se prepararon.

## Resuelve una entrega bloqueada

Lee el conflicto o el aviso de estado desactualizado. Conserva tus cambios locales, resuelve el problema concreto y reintenta la acción pendiente. No borres un worktree sólo para quitar la tarjeta: puede contener el trabajo que necesitas revisar.

En una spec con varios repositorios deben aceptarse todos, incluidos los resultados explícitos sin cambios. Los aceptados siguen registrados si falla otra integración. Comprueba el resultado: los tests de base o el resumen del modelo no demuestran por sí solos que la función esté implementada.
