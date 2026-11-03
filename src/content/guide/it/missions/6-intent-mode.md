<!-- guide-revision: mission-first-v1 -->

# Intent: di’ il problema, non la soluzione

**Intent** è il modo in cui un lavoro comincia in Specrails. Invece di scrivere una soluzione, scrivi l’**intent**: il problema, il risultato che cerchi, come saprai che ha funzionato, chi e cosa riguarda, i limiti e ciò che nessuno sa ancora. Specrails ne deriva la spec e tu rivedi la spec invece di scriverla. (Intent è il nuovo nome di ciò che prima si chiamava Flow, e mantiene tutto ciò che Flow faceva.)

## L’intent

Un intent ha sei parti e nessuna per la soluzione:

| Parte | Cosa contiene |
| --- | --- |
| **Problema** | Cosa non va oggi, per chi e quando fa male |
| **Risultato cercato** | Cosa è vero quando è risolto, con un’ipotesi facoltativa |
| **Come lo sapremo** | Segnali osservabili; diventano criteri di accettazione |
| **Chi e cosa riguarda** | Persone, schermate o sistemi |
| **Vincoli** | Limiti che ogni soluzione deve rispettare |
| **Domande aperte** | Ciò che nessuno sa ancora; gli agenti indagano invece di tirare a indovinare |

Se indichi una soluzione («aggiungi una cache Redis»), l’intent conserva a cosa serve («l’API risponde in meno di 200 ms») come risultato. La tua soluzione diventa un vincolo se la richiedi, o una domanda aperta se è solo un’opzione. Un intent resta in Specrails e non viene mai inviato a Jira.

## Da dove arriva un intent

- **In una missione.** Quando descrivi un lavoro, l’agente ti intervista su utenti, limiti e su come saprai che ha funzionato, poi mostra una scheda **Intent** con tutte le parti e, se la richiesta è ambigua, due letture. Clicca una lettura o rispondi con parole tue.
- **In Aggiungi spec.** **Intent** è il primo modo e si apre per impostazione predefinita. Descrivi il problema, premi **Genera intent e spec** e rivedi entrambi. Vedi i [modi di Aggiungi spec](/docs/specs-specs-and-the-backlog).

Ogni agente che lavora sulla spec riceve prima l’intent, come fonte di verità del perché e del risultato, mai del come. Quando un rail consegna una spec con intent, questo viene scritto come `intent.md` nella modifica OpenSpec, quindi vive in Git accanto al codice.

## Esplora o Delega

Un intent definito offre due strade uguali. Nessuna è consigliata; scegli tu.

- **Esplora** lo costruisce con un agente in una sessione Intent isolata. Quando il risultato è giusto, un rail deriva la spec da ciò che avete costruito. Usalo quando la forma non è ancora chiara: qualcosa di esplorativo o visivo.
- **Delega** fa scrivere la spec all’agente a partire dall’intent. La rivedi e un rail la costruisce con [Implement](/docs/pipeline-rails-and-jobs). Usalo quando ciò che vuoi è già chiaro.

## Avviare una sessione Intent

Scegli **Esplora**. Si apre una conferma: Specrails crea un worktree isolato in cui l’agente può scrivere codice, e il tuo branch principale non viene toccato. Premi **Avvia Intent**. Una spec provvisoria con il tuo intent compare sul board con l’etichetta **In Intent**; cliccala per tornare alla missione. Puoi anche avviare in Intent qualsiasi spec esistente con **Avvia in Intent**, sul board o nel dettaglio della spec.

## Mantieni il controllo mentre costruisci

Una barra sopra il compositore mostra il branch del worktree, i file modificati con righe aggiunte e rimosse, e il costo reale fatturato dal provider (mai una stima).

- **Vedi modifiche** elenca ogni file modificato con il suo stato e +/−.
- **Sospendi Intent** ferma l’agente e conserva il worktree e la spec. La missione offre poi **Riprendi Intent**, anche dopo il riavvio dell’app.
- **Scarta** elimina il worktree, il suo branch e la spec provvisoria, dopo una conferma. Una spec già esistente torna esattamente com’era.
- **Interrompi quando vuoi**: scrivi mentre l’agente lavora e il tuo messaggio interrompe il passo corrente.

Intent scrive solo dentro il suo worktree; fuori da Intent le missioni restano in sola lettura. Una missione ha un solo Intent alla volta.

## Affidare a un rail

Quando il risultato ti convince, premi **Affida**. La riga dice **Pronto a diventare una PR**, con rail, motore, modello e impegno già scelti. Modificali se vuoi e premi **Lancia**, oppure **Non ancora** per tornare indietro. Se si raggiunge il limite di revisione o un budget, la riga lo dice e non parte nulla.

Il rail deriva la spec e la modifica OpenSpec da ciò che hai costruito, le verifica e le rivede, archivia la modifica e consegna come qualsiasi esecuzione. La scheda di consegna compare nella missione, e il [pacchetto di revisione](/docs/missions-review-and-delivery) mostra quanta parte della modifica la spec derivata spiega. Se l’esecuzione fallisce per un motivo tecnico, il lavoro torna intatto nell’Intent.

## Jira solo alla consegna

Nulla arriva a Jira mentre sei in Intent o se lo scarti. Nei progetti collegati a [Jira](/docs/integrations-jira-integration), l’issue viene creata solo quando la consegna arriva in revisione, già completa della spec derivata.

## Requisiti

Intent richiede che lo Specrails Core incluso in Desktop lo supporti. Se **Avvia Intent** è disattivato, la scheda elenca cosa manca; aggiorna Specrails Core da **Impostazioni Desktop → Aggiornamenti → Specrails Core**. Il costo di Intent compare in Analytics come superficie a sé, **Intent**.
