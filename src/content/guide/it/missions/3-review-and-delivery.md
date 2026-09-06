<!-- guide-revision: mission-first-v1 -->

# Rivedi e accetta la consegna

Un’implementazione produce modifiche e prove da esaminare. Il superamento dei test esistenti non dimostra che la funzionalità richiesta sia stata implementata.

## Scegli l’azione

Integrare in locale applica il lavoro al branch di integrazione verificato. Checkout sposta il branch di lavoro nella cartella locale del repository; non equivale ad accettare la spec. Prima di una PR controlla repository, branch di destinazione e diff. Un worktree è un checkout Git isolato, non uno spazio ospitato da GitHub.

## Conserva i risultati parziali

Con più repository, esamina ogni consegna, compresi i risultati esplicitamente senza modifiche. L’integrazione non è una transazione atomica tra repository: i risultati già accettati restano registrati se un’altra azione fallisce.

In caso di conflitti o base cambiata, conserva le modifiche locali, leggi l’errore e ripeti solo l’azione pendente. Non eliminare un worktree per nascondere una scheda. Una revisione mantiene l’ambito congelato e il contesto della consegna precedente.
