<!-- guide-revision: mission-first-v1 -->

# Flow: construir primeiro, spec depois

**Novo.** O Flow permite construir código funcional com um agente antes de saber exatamente o que quer. Fala com o agente na conversa da missão, ele escreve e executa código real num worktree isolado e não é preciso nenhuma spec à partida. Quando o resultado é o certo, diz **É isto**, e um rail deriva a spec e entrega o trabalho como de costume.

## Flow para descobrir, Implement para delegar

Use o [Implement](/docs/pipeline-rails-and-jobs) quando já sabe descrever a alteração: regras, critérios de aceitação, uma API ou um modelo de dados. Acorde uma spec e delegue-a a um rail.

Use o Flow quando a forma ainda não está clara: algo exploratório ou visual, uma ideia que quer experimentar antes de se comprometer. Descobre o resultado construindo-o em conjunto, e a spec é escrita a partir do que construiu.

## Iniciar um Flow a partir da missão

Não precisa de pedir o Flow pelo nome. Quando descreve algo exploratório («quero experimentar…», «não sei como deve ficar»), a missão mostra um cartão com dois caminhos: **Flow**, para o construir em conjunto agora, e **Spec + Implement**, para acordar primeiro uma spec. O cartão assinala o caminho recomendado e explica porquê numa frase. O outro caminho está sempre a um clique, e o agente não insiste se o escolher ou carregar em **Agora não**.

Ao escolher Flow abre-se uma confirmação: o Specrails cria um worktree isolado onde o agente pode escrever código, e o seu ramo principal não é tocado. Carregue em **Iniciar Flow**. No board aparece uma spec provisória com a etiqueta **Em Flow**; clique nela para voltar à missão.

## Mantenha o controlo enquanto constrói

A conversa muda de aspeto e aparece uma barra do Flow acima do compositor. Mostra o ramo do worktree, os ficheiros alterados com linhas adicionadas e removidas, e o custo real do Flow conforme faturado pelo fornecedor (nunca uma estimativa).

- **Ver alterações** lista cada ficheiro alterado com o estado e +/−.
- **Pausar** para o agente e mantém o worktree e a spec. A missão oferece então **Retomar Flow**, mesmo após reiniciar a app.
- **Descartar** apaga, após confirmação, o worktree, o seu ramo e a spec provisória.
- **Interrompa quando quiser**: escreva enquanto o agente trabalha e a sua mensagem interrompe o passo atual. O botão de enviar passa a ser um raio e o agente continua de imediato com a nova informação.

O Flow só escreve dentro do seu worktree; fora do Flow, as missões continuam só de leitura. Uma missão tem um Flow de cada vez.

## Diga «É isto»

Quando estiver satisfeito com o resultado, carregue em **É isto**. A barra do Flow desaparece e surge o cartão de lançamento de rail de sempre, com o loop **Flow → Spec** pré-selecionado e um rail livre já escolhido. Ajuste o motor, o modelo ou o esforço se quiser e carregue em **Lançar**. Se o limite de revisão ou um orçamento tiver sido atingido, o cartão indica-o e não lança. **Ainda não** volta ao Flow.

O loop Flow → Spec deriva a spec do Specrails e a alteração OpenSpec a partir do que construiu, verifica-as e revê-as, arquiva a alteração e entrega como qualquer execução. O cartão de entrega aparece na missão, e o [pacote de revisão](/docs/missions-review-and-delivery) mostra que parte da alteração a spec derivada explica.

## Jira só na entrega

O Jira não recebe nada enquanto está em Flow nem se o descartar. Em projetos ligados ao [Jira](/docs/integrations-jira-integration), o issue só é criado quando a entrega chega à revisão, já completo com a spec derivada, e passa diretamente para o estado mapeado como revisão.

## Requisitos

O Flow está disponível a partir da versão do Specrails Desktop que o introduz e precisa que o Specrails Core incluído no Desktop suporte o Flow. Se **Iniciar Flow** estiver desativado, o cartão indica o que falta; atualize o Specrails Core em **Definições do Desktop → Atualizações → Specrails Core**. O custo do Flow aparece na Análise como superfície própria, **Flow**.
