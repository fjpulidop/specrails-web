# KI-Anbieter (Claude, Codex)

Specrails ist nicht an eine einzige KI gebunden. Jeder Teil der App, der mit einer KI spricht — Explore Spec, Quick-Spec, Rails, Chat, AI Edit, der „Open AI CLI“-Button im Terminal — kann über einen von zwei vollwertigen Anbietern laufen. Du legst fest, welche ein Projekt verwendet, und kannst sogar pro Aufgabe umschalten.

## Die zwei Anbieter

| Anbieter | CLI | Hersteller | Hinweise |
|---|---|---|---|
| **Claude** | `claude` | Anthropic | Der mit Abstand umfangreichste. Der einzige Anbieter für Agents (Profile), Freestyle-Rails und Contract Refine. |
| **Codex** | `codex` | OpenAI | Benötigt codex `0.128.0+`. Liest seine MCP-Server aus deiner globalen `~/.codex/config.toml`. |

## Einen Anbieter für ein Projekt installieren

Wenn du ein Projekt hinzufügst, fragt dich der Einrichtungsassistent, welche(n) Anbieter du installieren möchtest. Wähle einen aus, klicke dich durch den Installationsschritt — fertig. Ab da *hat* das Projekt diesen Anbieter einfach, und du musst nie wieder darüber nachdenken. Specs, Rails, Chat und Analytics funktionieren gleich, egal für welchen du dich entschieden hast.

Falls eine gewünschte CLI in „Projekt hinzufügen“ nicht angeboten wird, liegt das fast immer daran, dass die CLI nicht installiert ist oder nicht in deinem `PATH` liegt. Installiere sie und öffne „Projekt hinzufügen“ erneut.

## Mehrere Anbieter für ein Projekt installieren

Ein paar Dinge, die du über Multi-Anbieter-Projekte wissen solltest:

- **Ein einzelner Anbieter verhält sich genau wie zuvor.** Hat ein Projekt nur einen einzigen Anbieter, siehst du nirgendwo eine Anbieterauswahl — die App bleibt schlank und einfach.
- **Die rechte Seitenleiste zeigt nur Bereiche, die jeder installierte Anbieter unterstützt.** Da Agents (Profile) ein reines Claude-Konzept ist, verschwindet der Bereich **Agents** in dem Moment, in dem ein Projekt einen Nicht-Claude-Anbieter enthält. Alles andere (Specs, Code, Analytics, Integrationen, Terminal, Chat) bleibt erhalten.
- **Die Anbieterwahl ist nach dem Anlegen festgelegt.** In dieser Version wählst du deine Anbieter beim Hinzufügen des Projekts, und sie lassen sich später nicht mehr über die Einstellungen ändern. Brauchst du eine andere Kombination, ist das ein neues Projekt.

## Pro Aufruf einen Anbieter wählen

Der eigentliche Gewinn eines Multi-Anbieter-Projekts liegt darin, für jede Aufgabe die richtige KI zu wählen — ohne irgendeine globale Einstellung zu ändern. Überall dort, wo eine KI läuft, erscheint eine kleine Anbieterauswahl (nur, wenn das Projekt mehr als einen Anbieter hat):

- **Spec hinzufügen** — über die Engine-Auswahl kannst du eine Spec mit dem Anbieter deiner Wahl per Explore oder Quick erzeugen.
- **Rail-Kopf** — wähle die Engine für genau diese Rail, bevor du sie startest.
- **Terminal** — der „Open AI CLI“-Button (Sparkles) öffnet ein Anbietermenü, über das du in jede installierte CLI im Verzeichnis dieses Projekts springen kannst.

Deine Wahl wird pro Projekt gemerkt und fällt standardmäßig auf den primären Anbieter zurück — du musst also nicht jedes Mal neu wählen.

## Was nur Claude kann

Eine Handvoll Funktionen sind ihrer Natur nach Claude-spezifisch und werden daher ausgeblendet oder übersprungen, wenn ein anderer Anbieter im Spiel ist:

- **Agents (Profile)** — der projektbezogene Agenten-Katalog und das Modell-Routing. Auf jedem Projekt ausgeblendet, das einen Nicht-Claude-Anbieter enthält.
- **Freestyle-Rails** — laufen immer auf Claude.
- **Contract Refine** — der zusätzliche „Contract Layer“-Durchlauf auf einer committeten Spec läuft nur, wenn der Anbieter der Konversation Claude ist.
- **Erweiterte Modi bei „Spec hinzufügen“** (SMASH / Contract Layer) — bei Nicht-Claude-Engines ausgeblendet.

Alles andere — Explore, Quick-Spec, die vollständige Rails-Pipeline, AI Edit, Chat, Kosten-Analytics — funktioniert über alle zwei hinweg.

## Fehlerbehebung

- **Codex-MCP-Server werden im Chat nicht geladen.** Codex liest MCP-Server aus deiner globalen `~/.codex/config.toml` — registriere sie dort mit `codex mcp add`.
