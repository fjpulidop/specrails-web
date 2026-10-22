<!-- guide-revision: mission-first-v1 -->

# Flow: erst bauen, dann die Spec

**Neu.** Mit Flow bauen Sie gemeinsam mit einem Agenten funktionierenden Code, bevor Sie genau wissen, was Sie wollen. Sie sprechen in der Missionsunterhaltung mit dem Agenten, er schreibt und startet echten Code in einem isolierten Worktree, und vorab ist keine Spec nötig. Passt das Ergebnis, sagen Sie **Das ist es**, und eine Rail leitet die Spec ab und liefert die Arbeit wie gewohnt aus.

## Flow zum Entdecken, Implement zum Delegieren

Nutzen Sie [Implement](/docs/pipeline-rails-and-jobs), wenn Sie die Änderung schon beschreiben können: Regeln, Akzeptanzkriterien, eine API oder ein Datenmodell. Vereinbaren Sie eine Spec und delegieren Sie sie an eine Rail.

Nutzen Sie Flow, wenn die Form noch unklar ist: etwas Exploratives oder Visuelles, eine Idee, die Sie ausprobieren möchten, bevor Sie sich festlegen. Sie entdecken das Ergebnis, indem Sie es gemeinsam bauen, und die Spec entsteht aus dem Gebauten.

## Einen Flow aus der Mission starten

Sie müssen Flow nicht beim Namen nennen. Beschreiben Sie etwas Exploratives („ich will … ausprobieren“, „ich weiß nicht, wie es aussehen soll“), zeigt die Mission eine Karte mit zwei Wegen: **Flow**, um es jetzt gemeinsam zu bauen, und **Spec + Implement**, um zuerst eine Spec zu vereinbaren. Die Karte markiert den empfohlenen Weg und begründet ihn in einem Satz. Der andere Weg ist immer einen Klick entfernt, und der Agent besteht nicht darauf, wenn Sie ihn wählen oder **Nicht jetzt** drücken.

Wählen Sie Flow, öffnet sich eine Bestätigung: Specrails erstellt einen isolierten Worktree, in dem der Agent Code schreiben kann; Ihr Hauptbranch bleibt unberührt. Drücken Sie **Flow starten**. Auf dem Board erscheint eine vorläufige Spec mit dem Label **Im Flow**; ein Klick darauf führt zurück zur Mission.

## Behalten Sie beim Bauen die Kontrolle

Die Unterhaltung ändert ihr Aussehen, und über dem Eingabefeld erscheint eine Flow-Leiste. Sie zeigt den Branch des Worktrees, die geänderten Dateien mit hinzugefügten und entfernten Zeilen und die echten Kosten des Flows, wie vom Anbieter abgerechnet (nie eine Schätzung).

- **Änderungen ansehen** listet jede geänderte Datei mit Status und +/−.
- **Pausieren** stoppt den Agenten und behält Worktree und Spec. Die Mission bietet dann **Flow fortsetzen** an, auch nach einem Neustart der App.
- **Verwerfen** löscht nach einer Bestätigung Worktree, Branch und vorläufige Spec.
- **Jederzeit unterbrechen**: Schreiben Sie, während der Agent arbeitet, und Ihre Nachricht unterbricht den aktuellen Schritt. Der Senden-Button wird zum Blitz, und der Agent macht sofort mit Ihren neuen Informationen weiter.

Flow schreibt nur in seinem Worktree; außerhalb von Flow bleiben Missionen schreibgeschützt. Eine Mission hat jeweils einen Flow.

## Sagen Sie „Das ist es“

Sind Sie mit dem Ergebnis zufrieden, drücken Sie **Das ist es**. Die Flow-Leiste verschwindet, und die gewohnte Rail-Startkarte erscheint – mit vorausgewähltem Loop **Flow → Spec** und einer freien Rail. Passen Sie Engine, Modell oder Aufwand bei Bedarf an und drücken Sie **Starten**. Ist das Review-Limit oder ein Budget erreicht, sagt die Karte das und startet nicht. **Noch nicht** bringt Sie zurück in den Flow.

Der Loop Flow → Spec leitet aus dem Gebauten die Specrails-Spec und die OpenSpec-Änderung ab, verifiziert und prüft sie, archiviert die Änderung und liefert aus wie jeder Lauf. Die Auslieferungskarte erscheint in der Mission, und das [Review-Paket](/docs/missions-review-and-delivery) zeigt, welcher Teil der Änderung durch die abgeleitete Spec erklärt ist.

## Jira erst bei der Auslieferung

Jira erhält nichts, solange Sie im Flow sind oder wenn Sie ihn verwerfen. In Projekten mit [Jira](/docs/integrations-jira-integration)-Verbindung wird das Issue erst angelegt, wenn die Auslieferung das Review erreicht – bereits vollständig mit der abgeleiteten Spec – und wechselt direkt in den Status, der dem Review zugeordnet ist.

## Voraussetzungen

Flow ist ab dem Release von Specrails Desktop verfügbar, das es einführt, und setzt voraus, dass das in Desktop integrierte Specrails Core Flow unterstützt. Ist **Flow starten** deaktiviert, listet die Karte auf, was fehlt; aktualisieren Sie Specrails Core unter **Desktop-Einstellungen → Updates → Specrails Core**. Die Flow-Kosten erscheinen in Analytics als eigene Fläche **Flow**.
