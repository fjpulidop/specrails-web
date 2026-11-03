<!-- guide-revision: mission-first-v1 -->

# Intent: Sagen Sie das Problem, nicht die Lösung

**Intent** ist der Weg, in Specrails eine Arbeit zu beginnen. Statt eine Lösung zu schreiben, halten Sie den **Intent** fest: das Problem, das gewünschte Ergebnis, woran Sie erkennen, dass es funktioniert hat, wen und was es betrifft, die Grenzen und was noch niemand weiß. Specrails leitet daraus die Spec ab, und Sie prüfen die Spec, statt sie zu schreiben. (Intent ist der neue Name für das, was früher Flow hieß, und kann alles, was Flow konnte.)

## Der Intent

Ein Intent hat sechs Teile und keinen für die Lösung:

| Teil | Was hineingehört |
| --- | --- |
| **Problem** | Was heute nicht stimmt, für wen und wann es weh tut |
| **Angestrebtes Ergebnis** | Was gilt, wenn es gelöst ist, mit optionaler Hypothese |
| **Woran wir es erkennen** | Beobachtbare Signale; sie werden zu Akzeptanzkriterien |
| **Wen und was es betrifft** | Menschen, Bildschirme oder Systeme |
| **Rahmenbedingungen** | Grenzen, die jede Lösung einhalten muss |
| **Offene Fragen** | Was noch niemand weiß; Agenten untersuchen es, statt zu raten |

Nennen Sie eine Lösung („einen Redis-Cache hinzufügen“), behält der Intent deren Zweck („die API antwortet in unter 200 ms“) als Ergebnis. Ihre Lösung wird zur Rahmenbedingung, wenn Sie sie verlangen, oder zur offenen Frage, wenn sie nur eine Option ist. Ein Intent bleibt in Specrails und wird nie an Jira gesendet.

## Woher ein Intent kommt

- **In einer Mission.** Beschreiben Sie eine Arbeit, befragt Sie der Agent zu Nutzern, Grenzen und dazu, woran Sie den Erfolg erkennen, und zeigt eine **Intent**-Karte mit allen Teilen und, bei mehrdeutiger Anfrage, zwei Lesarten. Klicken Sie eine Lesart an oder antworten Sie mit eigenen Worten.
- **In Spec hinzufügen.** **Intent** ist der erste Modus und wird standardmäßig geöffnet. Beschreiben Sie das Problem, drücken Sie **Intent und Spec erzeugen** und prüfen Sie beides. Siehe die [Modi von Spec hinzufügen](/docs/specs-specs-and-the-backlog).

Jeder Agent, der an der Spec arbeitet, erhält zuerst den Intent, als Quelle der Wahrheit für das Warum und das Ergebnis, nie für das Wie. Liefert ein Rail eine Spec mit Intent aus, wird er als `intent.md` in die OpenSpec-Änderung geschrieben und liegt damit in Git neben dem Code.

## Erkunden oder Delegieren

Ein geklärter Intent bietet zwei gleichwertige Wege. Keiner wird empfohlen; Sie entscheiden.

- **Erkunden** baut es gemeinsam mit einem Agenten in einer isolierten Intent-Sitzung. Stimmt das Ergebnis, leitet ein Rail die Spec aus dem Gebauten ab. Geeignet, wenn die Form noch unklar ist: etwas Exploratives oder Visuelles.
- **Delegieren** lässt den Agenten die Spec aus dem Intent schreiben. Sie prüfen sie, und ein Rail baut sie mit [Implement](/docs/pipeline-rails-and-jobs). Geeignet, wenn klar ist, was Sie wollen.

## Eine Intent-Sitzung starten

Wählen Sie **Erkunden**. Eine Bestätigung öffnet sich: Specrails legt einen isolierten Worktree an, in dem der Agent Code schreiben kann, und Ihr Hauptbranch bleibt unberührt. Drücken Sie **Intent starten**. Eine Platzhalter-Spec mit Ihrem Intent erscheint auf dem Board mit dem Label **Im Intent**; ein Klick bringt Sie zurück zur Mission. Jede bestehende Spec können Sie ebenfalls mit **In Intent starten** im Board oder in den Spec-Details starten.

## Behalten Sie beim Bauen die Kontrolle

Eine Leiste über dem Eingabefeld zeigt den Worktree-Branch, die geänderten Dateien mit hinzugefügten und entfernten Zeilen und die tatsächlichen Kosten laut Anbieter (nie eine Schätzung).

- **Änderungen ansehen** listet jede geänderte Datei mit Status und +/−.
- **Intent pausieren** hält den Agenten an und behält Worktree und Spec. Die Mission bietet dann **Intent fortsetzen**, auch nach einem Neustart der App.
- **Verwerfen** löscht nach einer Bestätigung den Worktree, seinen Branch und die Platzhalter-Spec. Eine zuvor vorhandene Spec kommt genau so zurück, wie sie war.
- **Jederzeit unterbrechen**: Schreiben Sie, während der Agent arbeitet, und Ihre Nachricht unterbricht den aktuellen Schritt.

Intent schreibt nur in seinen Worktree; außerhalb von Intent bleiben Missionen schreibgeschützt. Eine Mission hat jeweils einen Intent.

## Übergeben

Sind Sie mit dem Ergebnis zufrieden, drücken Sie **Übergeben**. Die Zeile zeigt **Bereit, ein PR zu werden**, mit bereits gewähltem Rail, Engine, Modell und Aufwand. Passen Sie sie bei Bedarf an und drücken Sie **Starten**, oder **Noch nicht**, um zurückzugehen. Ist das Review-Limit oder ein Budget erreicht, sagt die Zeile es und es wird nichts gestartet.

Das Rail leitet Spec und OpenSpec-Änderung aus dem Gebauten ab, verifiziert und prüft sie, archiviert die Änderung und liefert wie jeder Lauf aus. Die Auslieferungskarte erscheint in der Mission, und das [Review-Paket](/docs/missions-review-and-delivery) zeigt, wie viel der Änderung die abgeleitete Spec erklärt. Scheitert der Lauf aus technischen Gründen, kehrt die Arbeit unversehrt in den Intent zurück.

## Jira erst bei der Auslieferung

Jira erhält nichts, solange Sie im Intent sind oder wenn Sie ihn verwerfen. In mit [Jira](/docs/integrations-jira-integration) verbundenen Projekten wird das Issue erst angelegt, wenn die Auslieferung das Review erreicht, dann bereits vollständig mit der abgeleiteten Spec.

## Voraussetzungen

Intent setzt voraus, dass das in Desktop integrierte Specrails Core es unterstützt. Ist **Intent starten** deaktiviert, listet die Karte auf, was fehlt; aktualisieren Sie Specrails Core unter **Desktop-Einstellungen → Updates → Specrails Core**. Die Intent-Kosten erscheinen in Analytics als eigene Fläche **Intent**.
