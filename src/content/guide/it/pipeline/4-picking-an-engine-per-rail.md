# Scegliere un engine per ogni rail

## Quando compare il selettore

Il **selettore di engine** vive nell'intestazione del rail, proprio accanto al controllo della modalità. Viene mostrato solo quando il progetto ha installato **più di un** provider.

> **I progetti con un solo provider si comportano in modo byte-identico.** Se un progetto ha un solo engine, non compare alcun selettore e nulla cambia nella selezione del provider — gira semplicemente su quell'engine. Il selettore è pensato esclusivamente per i progetti multi-provider.

Quando compare, la tua scelta è **per rail e per avvio** — rail diversi possono usare engine diversi, e la tua scelta viene ricordata per ogni progetto (con default sull'engine primario del progetto).

## Come scegliere un engine

L'engine selezionato esegue ogni fase della pipeline di quel rail. Se la CLI dell'engine scelto non è installata, l'avvio fallisce subito — non viene avviato nulla. Installa la CLI mancante e riprova.

## In cosa è bravo ciascun engine

Tutti e tre eseguono la pipeline standard **Implement**. Ecco una guida pratica alla scelta:

| Engine | Scegli questo quando… | Note |
|--------|--------------------|-------|
| **Claude** | Vuoi l'intero set di funzionalità: profili agente, Freestyle, reportistica nativa dei costi, il supporto agli strumenti più ricco. L'impostazione predefinita per la maggior parte del lavoro. | L'unico engine che supporta i **profili agente**, **Freestyle** e alcune funzionalità delle spec esclusive di Claude (Contract Layer, SMASH). |
| **Codex** | Preferisci la CLI Codex di OpenAI o vuoi confrontare le implementazioni tra provider diversi. | `codex` ≥ 0.128.0. Nessuna reportistica nativa dei costi — l'app ricava il costo dalla sua tabella prezzi. I profili non si applicano. |

### Le funzionalità esclusive di Claude

Alcune cose funzionano solo sui rail Claude — scegli Claude se ne hai bisogno:

- **Freestyle** — la modalità autonoma che bypassa la pipeline. Il segmento `Freestyle` e il suo selettore di modello Haiku/Sonnet/Opus compaiono solo quando l'engine del rail è Claude.
- **Contract Layer e SMASH** — funzionalità di affinamento delle spec esclusive di Claude (sono opzioni di Add Spec, non opzioni del rail, ma vale lo stesso vincolo).

Se un progetto mescola engine, la barra laterale destra mostra solo le sezioni supportate da **ogni** provider installato — quindi la sezione **Agenti** sparisce del tutto su un progetto che include un provider diverso da Claude, perché i profili sono specifici di Claude.

## Un flusso di lavoro pratico

I progetti multi-provider danno il meglio quando vuoi **confrontare** o **ottimizzare i costi**:

- **Confronta le implementazioni.** Metti la stessa spec su due rail, imposta uno su Claude e uno su Codex, avviali entrambi (su progetti diversi, oppure uno dopo l'altro nella coda dello stesso progetto), poi usa il pulsante **Confronta** nella pagina Job per mettere a confronto i risultati.
- **Imposta un default sensato.** Imposta l'engine che usi più spesso come primario del progetto, così i rail partono da quello, e cambia per ogni rail solo quando una spec specifica vuole un engine diverso.

## Cose da tenere a mente

- **La selezione del provider è immutabile dopo la creazione del progetto** (v1). Scegli i provider installati quando aggiungi il progetto; non c'è alcun interruttore nelle Impostazioni per aggiungerne o rimuoverne uno in seguito.
- **Il pulsante "Open AI CLI" del terminale** offre anch'esso un selettore di provider sui progetti multi-provider, se preferisci pilotare una CLI a mano.

## Dove andare ora

- [Usare Codex](../integrations/using-codex) — installazione e accesso.
- [Rail e job](rails-and-jobs) — la coda e il flusso di avvio.
- [Tracciare i costi](../analytics/tracking-cost) — ripartizione dei costi per engine.
