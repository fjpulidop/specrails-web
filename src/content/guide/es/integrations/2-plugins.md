<!-- guide-revision: mission-first-v1 -->

# Conecta integraciones del proyecto

Los plugins conectan Specrails con sistemas del proyecto, como proveedores externos de tickets. Configúralos para el proyecto lógico, no por separado en cada repositorio.

## Comprueba propiedad y credenciales

Abre los ajustes de integración y revisa la configuración requerida. Usa la cuenta y el proyecto externo previstos. Activar un plugin no concede acceso a todos los recursos del sistema externo.

Prueba la conexión y revisa los datos importados antes de implementar. Conserva los identificadores externos para que las actualizaciones lleguen al registro correcto.

## Añade repositorios sin dividir el backlog

Añadir un repositorio no crea otro propietario de integración ni fusiona un backlog ajeno. Las specs pueden abarcar varios repositorios con una integración compartida.

Si el plugin falla, conserva el error y evita repetir escrituras que creen duplicados. Consulta [Jira](/docs/integrations-jira-integration) y [MCP](/docs/integrations-mcp-server).
