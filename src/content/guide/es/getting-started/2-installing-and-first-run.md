<!-- guide-revision: mission-first-v1 -->

# Instala y conecta tu proveedor

Instala Specrails, comprueba sus requisitos e inicia sesión en el proveedor elegido antes de pedir trabajo al agente.

## Elige la aplicación

Descarga el instalador correspondiente desde [Descargas](/download). Comprueba los archivos y requisitos de esa versión: los builds nativos se dirigen a macOS Apple Silicon y Windows x64/ARM64. La existencia de un instalador no implica que todas las funciones se comporten igual en cada plataforma.

La distribución npm abre Specrails en tu navegador y necesita Node.js 20.19+, Git y una CLI de IA autenticada:

```sh
npm install -g specrails-desktop
specrails-desktop start
```

Abre `http://127.0.0.1:4200`. Esto no instala la aplicación nativa ni habilita ventanas de misión separadas. Evita ejecutar ambas distribuciones en el mismo puerto.

En ambos casos, Desktop es el único software de Specrails que instalas. La aplicación nativa incluye Specrails Core, su motor; la distribución npm descarga por sí misma la versión de Core correspondiente cuando prepara un proyecto.

## Completa la configuración

Instala y autentica al menos un proveedor compatible mediante su CLI. En Specrails, comprueba su disponibilidad y añade el proyecto. Después, Desktop usa Core para preparar los archivos de flujo en tu repositorio: no hay un paquete de Core que instalar ni un comando que ejecutar, y Core no incluye una suscripción a modelos.

Si aparece un runtime ausente o una actualización pendiente, resuelve ese estado en Desktop antes de implementar. **Ajustes de Desktop → Actualizaciones → Specrails Core** muestra la versión de Core en uso y ofrece **Completar actualización** tras una actualización interrumpida; no intentes instalar Core a mano. Conserva el error mostrado: una vista vacía no demuestra que tus proyectos se hayan borrado.

Siguiente: [añade tu proyecto](/docs/getting-started-adding-your-first-project).
