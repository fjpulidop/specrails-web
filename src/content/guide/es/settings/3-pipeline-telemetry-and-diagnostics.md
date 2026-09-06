<!-- guide-revision: mission-first-v1 -->

# Diagnostica un problema con evidencias

Un informe útil identifica versión, operación y fallo observable sin exponer datos ajenos al problema.

## Recoge el estado relevante

Anota sistema operativo, versión de Specrails, proveedor, identificador de ejecución o conversación y error exacto. Incluye paso y logs relevantes. Distingue una interfaz desconectada de una base vacía: comprueba backend y runtime antes de concluir que se perdieron registros.

Para entregas, identifica repositorio, rama y acción. Conserva cambios y worktrees hasta entender el fallo. Para navegador, indica si usabas la aplicación nativa o la versión de desarrollo en navegador.

## Comparte un informe acotado

Elimina credenciales, tokens y código ajeno al fallo. Proveedores, integraciones y diagnósticos tienen sus propios límites de datos; «local-first» no significa que toda operación configurada sea offline.

Describe cómo reproducirlo y qué esperabas en el [registro de incidencias](https://github.com/fjpulidop/specrails-desktop/issues).
