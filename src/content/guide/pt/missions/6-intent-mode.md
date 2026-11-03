<!-- guide-revision: mission-first-v1 -->

# Intent: diga o problema, não a solução

**Intent** é a forma de começar um trabalho no Specrails. Em vez de escrever uma solução, escreve o **intent**: o problema, o resultado que procura, como saberá que funcionou, quem e o que é afetado, os limites e o que ninguém sabe ainda. O Specrails deriva a spec a partir dele, e você revê a spec em vez de a escrever. (Intent é o novo nome do que antes se chamava Flow, e mantém tudo o que o Flow fazia.)

## O intent

Um intent tem seis partes e nenhuma para a solução:

| Parte | O que contém |
| --- | --- |
| **Problema** | O que falha hoje, para quem e quando dói |
| **Resultado buscado** | O que é verdade quando está resolvido, com uma hipótese opcional |
| **Como saberemos** | Sinais observáveis; tornam-se critérios de aceitação |
| **Quem e o que é afetado** | Pessoas, ecrãs ou sistemas |
| **Restrições** | Limites que qualquer solução deve respeitar |
| **Perguntas em aberto** | O que ninguém sabe ainda; os agentes investigam em vez de adivinhar |

Se indicar uma solução («adicionar uma cache Redis»), o intent guarda para que serve («a API responde em menos de 200 ms») como resultado. A sua solução passa a ser uma restrição, se a exigir, ou uma pergunta em aberto, se for uma opção. Um intent fica no Specrails e nunca é enviado ao Jira.

## De onde vem um intent

- **Numa missão.** Quando descreve um trabalho, o agente entrevista-o sobre os utilizadores, os limites e como saberá que funcionou, e mostra um cartão **Intent** com todas as partes e, se o pedido for ambíguo, duas leituras dele. Clique numa leitura ou responda por palavras suas.
- **Em Adicionar spec.** **Intent** é o primeiro modo e abre por omissão. Descreva o problema, prima **Gerar intent e spec** e reveja ambos. Veja os [modos de Adicionar spec](/docs/specs-specs-and-the-backlog).

Todo o agente que trabalha na spec recebe primeiro o intent, como fonte de verdade do porquê e do resultado, nunca do como. Quando um rail entrega uma spec com intent, este é escrito como `intent.md` na alteração OpenSpec, ficando no Git junto ao código.

## Explorar ou Delegar

Um intent definido oferece dois caminhos iguais. Nenhum é recomendado; decide você.

- **Explorar** constrói-o consigo um agente numa sessão Intent isolada. Quando o resultado está certo, um rail deriva a spec do que construíram. Use quando a forma ainda não está clara: algo exploratório ou visual.
- **Delegar** faz o agente escrever a spec a partir do intent. Você revê-a e um rail constrói-a com o [Implement](/docs/pipeline-rails-and-jobs). Use quando o que quer já está claro.

## Iniciar uma sessão Intent

Escolha **Explorar**. Abre-se uma confirmação: o Specrails cria um worktree isolado onde o agente pode escrever código, e o seu branch principal não é tocado. Prima **Iniciar Intent**. Uma spec provisória com o seu intent aparece no board com a etiqueta **Em Intent**; clique para voltar à missão. Pode também iniciar qualquer spec existente em Intent com **Começar em Intent**, no board ou no detalhe da spec.

## Mantenha o controlo enquanto constrói

Uma barra acima do compositor mostra o branch do worktree, os ficheiros alterados com linhas adicionadas e removidas, e o custo real faturado pelo fornecedor (nunca uma estimativa).

- **Ver alterações** lista cada ficheiro alterado com o seu estado e +/−.
- **Pausar Intent** para o agente e mantém o worktree e a spec. A missão oferece então **Retomar Intent**, mesmo após reiniciar a app.
- **Descartar** apaga o worktree, o seu branch e a spec provisória, após confirmação. Uma spec que já existia volta exatamente como estava.
- **Interrompa quando quiser**: escreva enquanto o agente trabalha e a sua mensagem interrompe o passo atual.

O Intent só escreve dentro do seu worktree; fora do Intent, as missões são só de leitura. Uma missão tem um Intent de cada vez.

## Passar a um rail

Quando o resultado lhe agradar, prima **Passar a um rail**. A linha diz **Pronto para virar uma PR**, com rail, motor, modelo e esforço já escolhidos. Ajuste-os se quiser e prima **Lançar**, ou **Ainda não** para voltar. Se o limite de revisão ou um orçamento for atingido, a linha di-lo e nada é lançado.

O rail deriva a spec e a alteração OpenSpec do que construiu, verifica-as e revê-as, arquiva a alteração e entrega como qualquer execução. O cartão de entrega aparece na missão, e o [pacote de revisão](/docs/missions-review-and-delivery) mostra quanto da alteração a spec derivada explica. Se a execução falhar por motivo técnico, o trabalho volta intacto ao Intent.

## Jira só na entrega

Nada chega ao Jira enquanto está em Intent nem se o descartar. Em projetos ligados ao [Jira](/docs/integrations-jira-integration), o issue só é criado quando a entrega chega à revisão, já completo com a spec derivada.

## Requisitos

O Intent precisa que o Specrails Core incluído no Desktop o suporte. Se **Iniciar Intent** estiver desativado, o cartão indica o que falta; atualize o Specrails Core em **Definições do Desktop → Atualizações → Specrails Core**. O custo do Intent aparece na Análise como superfície própria, **Intent**.
