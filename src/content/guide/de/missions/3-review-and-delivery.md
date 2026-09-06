<!-- guide-revision: mission-first-v1 -->

# Ergebnisse prüfen und übernehmen

Eine Umsetzung liefert Änderungen und Nachweise zur Prüfung. Bestehende grüne Tests allein beweisen nicht, dass die gewünschte Funktion umgesetzt wurde.

## Die passende Aktion wählen

Lokal integrieren übernimmt die Arbeit in den geprüften Integrationsbranch. Checkout verschiebt den Arbeitsbranch in den lokalen Repository-Ordner; das akzeptiert die Spec noch nicht. Prüfen Sie vor einer PR Repository, Zielbranch und Diff. Ein Worktree ist ein isolierter Git-Checkout und kein von GitHub gehosteter Arbeitsbereich.

## Teilergebnisse erhalten

Prüfen Sie bei mehreren Repositories jede Lieferung, einschließlich ausdrücklich unveränderter Ergebnisse. Die Integration ist keine atomare Transaktion über Repositories hinweg: bereits akzeptierte Ergebnisse bleiben erhalten, wenn eine andere Aktion scheitert.

Bewahren Sie bei Konflikten oder geänderter Basis lokale Änderungen auf, lesen Sie den Fehler und wiederholen Sie nur die offene Aktion. Löschen Sie keinen Worktree, um eine Karte auszublenden. Eine Revision behält den eingefrorenen Umfang und den vorherigen Lieferkontext.
