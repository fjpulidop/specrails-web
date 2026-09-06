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

## Completa la configuración

Instala y autentica al menos un proveedor compatible mediante su CLI. En Specrails, comprueba su disponibilidad y añade el proyecto. La instalación de Core prepara los flujos necesarios; no incluye una suscripción a modelos.

Si aparece un runtime ausente o una actualización pendiente, resuelve ese estado antes de implementar. Conserva el error mostrado: una vista vacía no demuestra que tus proyectos se hayan borrado.

Siguiente: [añade tu proyecto](/docs/getting-started-adding-your-first-project).
