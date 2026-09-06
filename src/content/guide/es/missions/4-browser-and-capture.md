<!-- guide-revision: mission-first-v1 -->

# Navega, captura y anota

Usa el navegador de la misión para inspeccionar la aplicación que construyes y aportar contexto visual concreto al agente.

## Elige la superficie adecuada

La aplicación nativa utiliza WebKit en macOS y WebView2 en Windows para navegar dentro de la misión. El desarrollo en navegador y los flujos de captura usan una superficie con Playwright. La representación, la autenticación y la captura varían entre ambas; una vista del navegador no graba automáticamente todo el escritorio.

Abre la página, elige el viewport y espera a que cargue. Los popups de acceso pertenecen a esa sesión: completa allí la autenticación y vuelve a la aplicación. No pegues contraseñas ni tokens de sesión en la misión.

## Haz concreto el comentario

Selecciona la región o el elemento y anota la captura en el editor antes de adjuntarla. Las selecciones completadas, incluidas las de todos los tamaños, pasan por esta revisión. Cancela para descartarla; si falla el adjunto, el editor permite reintentar conservando las anotaciones. Explica qué está mal, qué debería ocurrir y cómo comprobarlo. Por ejemplo: «Con este ancho, la acción principal debe seguir visible sin desplazamiento horizontal».

Antes de mover la misión a otra ventana, termina o cancela la captura en curso. El traslado nativo puede conservar la sesión; la superficie alternativa puede requerir cerrarse primero. Una captura demuestra qué se veía, no que el comportamiento de la página sea correcto.
