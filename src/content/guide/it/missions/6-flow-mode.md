<!-- guide-revision: mission-first-v1 -->

# Flow: prima costruisci, poi la spec

**Novità.** Flow ti permette di costruire codice funzionante con un agente prima di sapere esattamente cosa vuoi. Parli con l’agente nella conversazione della missione, lui scrive ed esegue codice reale in un worktree isolato e non serve nessuna spec in partenza. Quando il risultato è quello giusto dici **Ecco fatto**, e un rail deriva la spec e consegna il lavoro come sempre.

## Flow per scoprire, Implement per delegare

Usa [Implement](/docs/pipeline-rails-and-jobs) quando sai già descrivere la modifica: regole, criteri di accettazione, un’API o un modello di dati. Concorda una spec e delegala a un rail.

Usa Flow quando la forma non è ancora chiara: qualcosa di esplorativo o visivo, un’idea da provare prima di impegnarti. Scopri il risultato costruendolo insieme, e la spec viene scritta a partire da ciò che hai costruito.

## Avviare un Flow dalla missione

Non devi chiedere Flow per nome. Quando descrivi qualcosa di esplorativo («voglio provare…», «non so come dovrebbe venire»), la missione mostra una scheda con due strade: **Flow**, per costruirlo insieme adesso, e **Spec + Implement**, per concordare prima una spec. La scheda indica la strada consigliata e spiega il perché in una frase. L’altra strada è sempre a un clic, e l’agente non insiste se la scegli o premi **Non ora**.

Scegliendo Flow si apre una conferma: Specrails crea un worktree isolato in cui l’agente può scrivere codice, e il tuo branch principale non viene toccato. Premi **Avvia Flow**. Sulla board compare una spec provvisoria con l’etichetta **In Flow**; cliccala per tornare alla missione.

## Mantieni il controllo mentre costruisci

La conversazione cambia aspetto e sopra il compositore compare una barra di Flow. Mostra il branch del worktree, i file modificati con le righe aggiunte e rimosse e il costo reale del Flow come fatturato dal provider (mai una stima).

- **Vedi modifiche** elenca ogni file modificato con stato e +/−.
- **Pausa** ferma l’agente e conserva worktree e spec. La missione offre poi **Riprendi Flow**, anche dopo il riavvio dell’app.
- **Scarta** elimina, dopo una conferma, il worktree, il suo branch e la spec provvisoria.
- **Interrompi quando vuoi**: scrivi mentre l’agente lavora e il tuo messaggio interrompe il passo in corso. Il pulsante di invio diventa un fulmine e l’agente prosegue subito con le nuove informazioni.

Flow scrive solo dentro il suo worktree; fuori da Flow le missioni restano in sola lettura. Una missione ha un solo Flow alla volta.

## Di’ «Ecco fatto»

Quando il risultato ti convince, premi **Ecco fatto**. La barra di Flow sparisce e compare la solita scheda di lancio del rail, con il loop **Flow → Spec** preselezionato e un rail libero già scelto. Regola motore, modello o sforzo se vuoi e premi **Lancia**. Se è stato raggiunto il limite di revisione o un budget, la scheda lo dice e non lancia. **Non ancora** ti riporta al Flow.

Il loop Flow → Spec deriva la spec di Specrails e il change OpenSpec da ciò che hai costruito, li verifica e li revisiona, archivia il change e consegna come qualsiasi esecuzione. La scheda di consegna compare nella missione, e il [pacchetto di revisione](/docs/missions-review-and-delivery) mostra quale parte della modifica è spiegata dalla spec derivata.

## Jira solo alla consegna

Jira non riceve nulla mentre sei in Flow o se lo scarti. Nei progetti collegati a [Jira](/docs/integrations-jira-integration), l’issue viene creata solo quando la consegna arriva in revisione, già completa con la spec derivata, e passa direttamente allo stato mappato come revisione.

## Requisiti

Flow è disponibile a partire dalla release di Specrails Desktop che lo introduce e richiede che lo Specrails Core incluso in Desktop supporti Flow. Se **Avvia Flow** è disattivato, la scheda elenca cosa manca; aggiorna Specrails Core da **Impostazioni Desktop → Aggiornamenti → Specrails Core**. Il costo di Flow compare in Analytics come superficie a sé, **Flow**.
