# Auditoría Impeccable — 26 de octubre de 2026

## Veredicto de integridad

**Los seis hallazgos verificados están corregidos.** Véase [el resultado tras las correcciones](#resultado-tras-las-correcciones). Las secciones originales se conservan como línea base de la auditoría.

**Línea base:** sistema coherente, con incidencias técnicas pendientes. La paleta navy/cian/violeta procede de la marca y comparte tokens entre páginas. Las grabaciones son la interfaz React real de Desktop con datos de muestra y puente Tauri simulado. Los avisos de Impeccable sobre esa paleta e Inter no justifican reemplazar la identidad. La auditoría y sus comprobaciones automatizadas no suponen una certificación WCAG.

| Dimensión | Nota / 4 | Evidencia principal |
| --- | --- | --- |
| Accesibilidad | 2 | Contraste de enlaces cian en superficies claras: 4,35:1; salto h1→h3 |
| Rendimiento | 3 | Rutas diferidas, imágenes lazy y vídeo bajo demanda; bundle inicial 172 kB gzip |
| Temas | 3 | Tokens y cambio claro/oscuro coherentes; contraste claro insuficiente en surface-1 |
| Responsive | 3 | Sin overflow a 390 y 1440 px; varios controles menores de 44 px |
| Integridad de implementación | 3 | Sistema consistente; landmarks y encabezados necesitan ajustes |
| **Total** | **14/20** | **Bueno, con correcciones necesarias** |

Las notas son valoración del auditor siguiendo la rúbrica de Impeccable, no una puntuación calculada por el detector. **6 incidencias agrupadas: P0: 0; P1: 1; P2: 4; P3: 1.**

## Alcance y método

- Skill oficial `pbakaus/impeccable`, versión 4.7.1 (commit `989c484c091d26f10fa102767eefc0da2e62ec67`): `impeccable context`, playbook `reference/audit.md` y detector oficial. No se instalaron hooks ni se cambiaron dependencias del sitio.
- Detector de código: `impeccable detect --json src/ index.html`.
- Detector renderizado: `/`, `/download`, `/companion`, `/docs` en Chromium a 1440×900 y 390×844. Salida 2: ejecución completada con avisos, no error operativo.
- Verificación adicional con Playwright y axe-core 4.14.0: esas cuatro rutas más `/docs/getting-started`, a 390×900 y 1440×900, en claro y oscuro (20 combinaciones). Capturas revisadas, comprobación de overflow, nombres accesibles, encabezados y errores de página. Los vídeos siguen sin descargarse hasta una acción explícita.
- Navegación y vídeo se cubren además con las pruebas del repositorio. No se ha realizado una certificación de accesibilidad, prueba con lector de pantalla, dispositivos físicos, gestos táctiles sintetizados, Safari/Firefox, zoom al 200%, todas las traducciones ni Core Web Vitals de producción. El estado remoto de GitHub Releases no se fijó en esta auditoría.
- Evidencia JSON en [la carpeta del informe](impeccable-2026-10-26/). Contiene la salida original del detector y resultados resumidos de axe/Playwright. Las observaciones de destinos pequeños son candidatos, no fallos WCAG automáticos: hay excepciones de espaciado y enlaces inline.

## Incidencias verificadas

### [P1] Contraste cian sobre superficies claras

**Categorías:** Accesibilidad / Temas. **Ubicación:** `src/index.css:131` (tema claro, `--brand-cyan`/`--primary`); usos en `src/components/ProductRecordings.tsx` (Reproducir), `ProductLanding.tsx` (Loop Builder), `src/pages/DocsIndex.tsx` y `DocsSidebar.tsx` (enlace activo).

Axe mide **4,35:1**, inferior al mínimo **4,5:1** de WCAG 1.4.3 para texto normal. Se reproduce en ambos tamaños: cuatro nodos en portada, dos en `/docs` y el enlace activo de la guía en escritorio. La paleta funciona sobre blanco pero pierde margen sobre surface-1. Oscurecer el token o introducir un token de texto que cumpla sobre todas las superficies soportadas, y volver a medir sin cambiar los colores de marca de forma arbitraria. **Comando sugerido:** `$impeccable harden`.

### [P2] Las tarjetas de vídeo saltan de h1 a h3

**Categoría:** Accesibilidad. **Ubicación:** `src/pages/Index.tsx:60` y `src/components/ProductRecordings.tsx:170–175`.

La portada usa `showHeading={false}` y elimina el h2, pero conserva los h3 de las tarjetas. Confirmado por Impeccable y axe `heading-order`; dificulta navegar por encabezados con tecnologías de asistencia. Mantener un h2 accesible (puede ser visualmente oculto) o ajustar los niveles según el contexto. **Referencia:** técnica WCAG G141, jerarquía semántica; el aviso automático por sí solo no demuestra una infracción de nivel AA. **Comando:** `$impeccable harden`.

### [P2] Landmarks de navegación con nombres repetidos

**Categoría:** Accesibilidad. **Ubicación:** `src/components/Navbar.tsx`, `src/components/DocsSidebar.tsx` y navegación de la guía.

Axe `landmark-unique` señala una navegación sin nombre en `/docs` y dos en el artículo a 1440 px. Los lectores de pantalla no distinguen bien navegación global, índice de documentación y secciones del artículo. Añadir nombres localizados y específicos a cada landmark. Es una recomendación semántica/best-practice, no una infracción AA demostrada por este aviso. **Comando:** `$impeccable harden`.

### [P2] Reduced motion depende de un corte global

**Categoría:** Accesibilidad / Movimiento. **Ubicación:** `src/index.css:519–532`.

Todas las animaciones/transiciones se fuerzan a 0,001 ms. Hay excepciones positivas para mostrar contenido de entrada, pero esta regla también elimina la respuesta de controles y de futuras transiciones de estado. Sustituir por alternativas dirigidas: sin desplazamientos, opacidad/estados instantáneos legibles y foco preservado. No se observó bloqueo de lectura; es deuda preventiva del contrato de movimiento, no un fallo WCAG demostrado. **Comando:** `$impeccable animate`.

### [P2] Controles móviles con poco margen táctil

**Categoría:** Responsive. **Ubicación:** `src/components/Navbar.tsx` y `src/components/LanguageSwitcher.tsx`.

Los controles de tema, idioma y menú tienen aproximadamente 36×36 px. Funcionan y superan el mínimo básico de 24 px de WCAG 2.5.8, pero quedan por debajo del objetivo de comodidad de 44×44 px utilizado por la rúbrica. Aumentar el área interactiva conservando el tamaño visual del icono, y probar el menú con tacto real. No confundir los enlaces inline, summaries espaciados o skip-links ocultos con infracciones automáticas. **Comando:** `$impeccable adapt`.

### [P3] Viudas y títulos desequilibrados en algunos anchos

**Categoría:** Integridad / Tipografía. **Ubicación:** `src/components/ProductLanding.tsx` y `src/pages/DocsIndex.tsx`.

Impeccable encuentra diez avisos `straggler` en cada tamaño y dos `unbalanced-heading`; dependen del ancho. No bloquean lectura. Revisar `text-wrap: pretty` para párrafos y `balance` para títulos concretos, manteniendo el salto deliberado del hero y comprobando las traducciones. **Comando:** `$impeccable typeset`.

## Interpretación del detector

- Objetivos modificados (referencias de medios): **0 avisos**; evidencia `changed-targets.json`.
- Código completo: **4 avisos** (2 side-tab, 1 Inter, 1 gradient-text).
- Escritorio: **24 avisos + 14 advisory**. Móvil: **19 avisos + 14 advisory**. Son instancias por selector/ruta, no problemas únicos ni una nota de calidad.
- `ai-color-palette`, `overused-font`: observaciones estéticas, no defectos técnicos. Se conserva la paleta de marca y la tipografía existente.
- `side-tab`: el borde de DocsSidebar indica la página activa; el de blockquote expresa una cita. No son tarjetas decorativas repetidas.
- `gradient-text`: el detector encuentra una clase definida; eso no demuestra que exista texto degradado en estas rutas.
- `dark-glow`: el detector encuentra el halo de foco definido globalmente. Conservar la visibilidad de foco; no quitarlo para silenciar el detector.
- `cramped-padding` en `#engineering`: el bloque ya tiene los 20 px del main como margen exterior en móvil. No hay texto pegado al borde de la pantalla; una banda con separación interna puede pulirse, pero no es un defecto funcional confirmado.
- `hero-eyebrow-chip`, `kicker-above-heading` y etiquetas numeradas: decisiones visuales existentes. Evaluarlas en una crítica de diseño futura, sin mezclarlas con accesibilidad.

## Rendimiento medido en build

Vite emite el chunk inicial de 517,55 kB (172,11 kB gzip) y el de documentación de 358,10 kB (110,10 kB gzip). La advertencia de chunk >500 kB se mantiene como oportunidad de optimización; no se ha inventado un tiempo de carga ni una puntuación Lighthouse a partir de esos tamaños.

## Prácticas que conviene conservar

Sin overflow ni excepciones JS en las 20 combinaciones verificadas. Los inputs y botones inspeccionados tienen nombre accesible. Rutas diferidas, vídeo cargado solo tras interacción, reproducción exclusiva, recuperación de errores, foco restaurado al cerrar el modal y transcripciones en ocho idiomas. Tokens de color por rol, foco visible global y ausencia de reproducción automática.

## Orden de trabajo recomendado

1. `$impeccable harden`: contraste claro, encabezados y landmarks.
2. `$impeccable adapt`: áreas táctiles y prueba móvil física.
3. `$impeccable animate`: alternativas específicas para reduced motion.
4. `$impeccable typeset`: viudas/títulos en los idiomas soportados.
5. `$impeccable document`: registrar el sistema existente en DESIGN.md; PRODUCT.md también está ausente, sin bloquear esta auditoría.
6. `$impeccable polish`: revisión final tras las correcciones.

Se pueden ejecutar individualmente, juntos o en otro orden. Repetir `$impeccable audit` y axe después de corregir para comparar la evidencia. La línea base identifica los seis problemas que se corrigen en esta misma rama; la evidencia original se conserva para comparar.

## Validación inicial de la rama

- 38 archivos de pruebas, **262 tests** correctos.
- `npm run check:types`, `npm run build` y las pruebas de assets del prebuild correctos.
- `npm run lint`: 0 errores; 13 advertencias previas de Fast Refresh.
- `git diff --check` correcto.
- Los seis vídeos finales se decodifican completos: H.264/VP9, 1440×900, sin pista de audio, duraciones 15/12/10 segundos. Fotogramas de cada clip revisados; el detalle de spec ya recibe una página válida de actividad vacía y no muestra error de archivos. Metadatos en `media-verification.json`.
- Reproducción real en Chromium de las tres tarjetas: vídeo nuevo a 1440×900 y pausa del reproductor anterior al iniciar el siguiente. Visor ampliado y cierre con Escape comprobados.


## Resultado tras las correcciones

Los seis hallazgos quedan cerrados en la implementación; se mantienen las limitaciones de verificación indicadas abajo. La evidencia posterior está en [after/](impeccable-2026-10-26/after/), separada de la línea base.

| Hallazgo | Corrección | Comprobación |
| --- | --- | --- |
| Contraste claro | Cian a `190 95% 27%`, incluidos aliases; índice del artículo sin opacidad reducida | Reproducir sobre surface-1: **5,20:1**; axe sin fallos de contraste |
| Salto h1→h3 | H2 accesible conservado al ocultar el título visual de los vídeos | Prueba de jerarquía y axe sin `heading-order` |
| Landmarks repetidos | Nombres específicos para navegación principal, breadcrumbs, asides y buscadores | Ocho idiomas; axe sin `landmark-unique` |
| Movimiento reducido | Se eliminó el corte universal; efectos decorativos estáticos, entradas visibles y superficies Radix con fade de 100/80 ms | Menú reduce=`reduced-surface-in` (0,1 s); normal=`enter` (0,5 s); foco y cambio de tema conservados |
| Área táctil móvil | Idioma, tema, menú y opciones de idioma con mínimo 44 px | Tres controles de cabecera de **44×44** a 320 px en los ocho idiomas |
| Viudas/títulos | `text-pretty` en texto y `text-balance` en títulos concretos; se conserva el salto deliberado del hero | **0** `straggler` y **0** `unbalanced-heading` en las pasadas finales de ambos tamaños |

Además, la banda de funcionalidades tiene separación interior alineada con el resto de la portada y ya no genera `cramped-padding`. El menú principal usa el disparador de Radix; al cerrarlo con Escape devuelve el foco al botón de apertura, también en movimiento reducido. El menú móvil de la guía y el selector de idioma restauran igualmente su foco.

### Valoración posterior

| Dimensión | Antes | Después | Límite de la nota |
| --- | --- | --- | --- |
| Accesibilidad | 2 | 3 | Automatización sin incidencias; no prueba exhaustiva con lector de pantalla |
| Rendimiento | 3 | 3 | Sin cambios de arquitectura; sigue la advertencia de bundle >500 kB |
| Temas | 3 | 4 | Colores y foco coherentes en las rutas y estados examinados |
| Responsive | 3 | 3 | 80 combinaciones de layout y tacto sintetizado; falta dispositivo físico |
| Integridad | 3 | 4 | Se cierran los hallazgos verificados y se conserva la identidad |
| **Total** | **14/20** | **17/20** | Valoración del auditor, no puntuación calculada por el detector |

### Verificación final

- **264 tests** en 38 archivos; tipos, lint y build correctos. Lint conserva 13 advertencias previas de Fast Refresh.
- Axe-core: **0 infracciones detectadas en 20 combinaciones** (cinco rutas × dos temas × dos tamaños). Los casos `incomplete` siguen registrados para revisión humana; cero resultados automáticos no certifica WCAG.
- Layout: `/` y `/docs` en los ocho idiomas a **320, 390, 768, 1024 y 1440 px**: 80 combinaciones sin overflow ni excepciones de página. Capturas representativas revisadas.
- Tacto sintetizado en Chromium a 390 px: idioma español, apertura/cierre del menú, devolución de foco y cambio claro→oscuro, con y sin movimiento reducido. **Sin prueba de dispositivo físico**.
- Impeccable final: escritorio **23 avisos + 2 advisory**; móvil **17 avisos + 2 advisory**. No quedan avisos de salto de encabezado, padding apretado, viudas ni títulos desequilibrados. Persisten los avisos estéticos documentados de paleta, Inter, foco, etiquetas y numeración; no se han ocultado mediante ignores ni se ha sustituido la identidad para silenciarlos.
- La creación de PRODUCT.md y una descripción completa en DESIGN.md sigue siendo una recomendación opcional de contexto, no una incidencia funcional ni un requisito para cerrar estos seis hallazgos.
