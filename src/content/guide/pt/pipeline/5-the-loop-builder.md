# O Loop Builder

Um **rail roda um Loop**. Os loops embutidos (`Implement`, `Quick SDD`, `Freestyle`) cobrem os casos do dia a dia, mas o **Loop Builder** deixa você desenhar os seus próprios — um editor visual, no estilo n8n, para automação que se repete até atingir uma meta. Esta página explica o que é um loop, como construir um e como rodá-lo em um rail.

## Loops e rails — a relação

Um **loop** é a *receita* do trabalho; um **rail** é a *pista* que o roda contra as suas specs.

```
   Loop Builder (barra lateral esq.)        Rails (direita)
   ───────────────────────────             ─────────────
   Implement   (embutido)                  Rail 1
   Quick SDD   (embutido)      escolha ►      Loop: Verify-until-green
   Freestyle   (embutido)                     ▶ Play
   Verify-until-green (seu)
```

- Os loops vivem na seção **Loops** (barra lateral esquerda, ao lado dos seus projetos) — eles são **globais**, compartilhados por todos os projetos.
- Um rail **escolhe um loop** no cabeçalho (o seletor de Loop) e o roda quando você aperta Play.

Ou seja: construa um loop uma vez e depois escolha-o em qualquer rail, em qualquer projeto.

## Abrindo o builder

Clique em **Loops** na barra lateral esquerda para ver a biblioteca: os três loops embutidos mais os seus próprios. Abra um para vê-lo, ou clique em **New loop** para começar de uma tela em branco.

Os loops embutidos são editados diretamente: abra um, altere o grafo e publique — a partir daí a sua versão vale em todo lugar onde esse loop embutido é usado. **Restore original** volta à versão original. Loops embutidos não podem ser excluídos.

## Do que um loop é feito

Um loop é um grafo de **nós** conectados por **arestas** (as setas). Cada nó é um passo:

| Nó | O que faz |
|------|--------------|
| **Start** | Onde a execução começa. Exatamente um por loop. |
| **AI Step** | Roda um turno de IA — um prompt que você escreve, ou um *comando mágico* como `{{cmd:implement}}`, `{{cmd:verify}}`, `{{cmd:fix}}`. É aqui que o trabalho de verdade acontece. |
| **Shell** | Roda um comando de shell (ex.: `npm test`) e captura sua saída para passos posteriores. |
| **Loop Decider** | O cérebro de um loop. A cada passagem ele lê uma **meta** que você escreve e decide **continue** (voltar e tentar de novo) ou **stop** (sair). É isto que faz funcionar o *verify → fix → verify até ficar verde*. |
| **End** | Um nó terminal. Marca a execução como sucesso ou falha. |

As arestas conectam os passos em ordem. O **Loop Decider** tem duas saídas rotuladas — **continue** e **stop** — então você liga o "ainda não terminei" de volta ao trabalho e o "terminei" para um End.

### Escrevendo o texto dos passos

Dentro de qualquer AI Step ou Decider você pode referenciar:

- **Dados da spec** — `{{spec.title}}`, `{{spec.description}}`, `{{spec.ids}}` (os IDs dos tickets do rail). Preenchidos a partir da(s) spec(s) do rail em tempo de execução.
- **Comandos mágicos** — `{{cmd:implement}}` e seus companheiros expandem para o comando de pipeline correspondente.
- **Constantes** — `{{const:NAME}}` puxa da **biblioteca de constantes** global (arraste-as da paleta). Sentinelas embutidos como os marcadores de PASS/FAIL da verificação estão sempre disponíveis; você pode adicionar os seus e reutilizá-los em todos os loops.

## Mantendo um loop limitado

Um loop que nunca para queimaria dinheiro para sempre, então toda execução tem três proteções (definidas na barra de ferramentas do builder):

| Proteção | O que faz |
|-------|--------------|
| **Max iterations** | Teto rígido de quantas vezes o Decider pode voltar atrás, independentemente do seu veredito. |
| **Timeout (min)** | Limite de tempo de relógio para toda a execução. |

## Construindo com confiança

O builder ajuda você a acertar um loop antes mesmo de ele rodar:

- **Validação ao vivo** — problemas (sem Start, um passo órfão, um prompt vazio, um Decider com ramos faltando) são sinalizados na tela e em um painel de problemas.
- **Pré-visualização de dry-run** — resolve o texto exato de cada passo (dados da spec, constantes e comandos todos expandidos) **sem spawnar nada**, para você ver com precisão o que cada passo enviaria.
- **Auto-arrange** — organize a tela na vertical, na horizontal ou em grade; sua escolha é salva por loop.
- **Copiar / colar** — `Cmd/Ctrl + C` / `V` para copiar passos dentro de um loop ou entre loops.
- **Importar / exportar** — salve loops em um arquivo `.json` e importe-os de volta (nomes duplicados são ignorados, o resto é importado).
- **Renomear passos** — dê a cada nó um rótulo personalizado para que o grafo fique legível.

## Publicando e rodando

Um loop começa como um **Draft**. Quando o grafo está válido, faça **Publish** — os loops publicados são os que aparecem no seletor de Loop de um rail. (Faça Unpublish para tirá-lo de circulação sem apagá-lo.)

Para rodar um loop personalizado:

1. Abra um projeto e arraste uma spec para um rail.
2. No cabeçalho do rail, abra o **seletor de Loop** e escolha o seu loop publicado.
3. Aperte **▶ Play**.

A execução transmite ao vivo na vista **Jobs** com as mesmas métricas e o mesmo rastreamento de custo de qualquer job de rail — e o seu log ganha um **explorador de passos** dedicado: um mapa ao vivo do seu grafo com uma caixa recolhível por passo, seguindo o passo em execução à medida que o loop avança (ver [A vista de detalhe do job](the-job-detail-view)). No Claude, cada **Passo de IA** é também uma sessão ao vivo: envie mensagens a ele pelo compositor do detalhe do job para orientá-lo no meio do passo (entre passos o compositor espera brevemente, e **Assentar este passo** faz o loop avançar com o que o passo produziu). Um loop que para porque atingiu seu teto de iterações ou de custo é reportado com esse resultado, em vez de um simples sucesso.

> **Atenção enquanto um loop roda.** Você não pode editar nem apagar um loop enquanto uma de suas execuções está rodando — pare a execução primeiro.

## Para onde ir agora

- [Rails e jobs](rails-and-jobs) — lançando rails e a fila de jobs.
- [A vista de detalhe do job](the-job-detail-view) — acompanhando uma execução ao vivo.
- [Escolhendo um motor por rail](picking-an-engine-per-rail) — o rail (não o loop) escolhe o provedor.

## Compor e validar o grafo

Use o catálogo disponível na sua versão do Desktop. Arraste etapas para o canvas, conecte os resultados e configure cada etapa no inspetor. Valide o grafo antes de publicar e corrija os erros antes de executar. O Specrails Core é o motor integrado no Desktop que executa estes workflows. A versão é gerida em Definições do Desktop → Atualizações → Specrails Core.

Dê a cada função apenas o acesso necessário. Separe a investigação de leitura das alterações de código e ligue as alterações a uma verificação explícita. Os ramos paralelos partilham o orçamento do workflow; um nó End bem-sucedido, por si só, não comprova que as alterações têm evidência verificada.

Quando a versão de Core selecionada disponibiliza limites por invocação, os blocos de prompt, função e decider oferecem `timeoutMs` e `idleTimeoutMs`. Use `0` para desativar esse temporizador da etapa ou remova o campo para herdar o valor padrão. Os orçamentos do workflow completo e o cancelamento continuam ativos. Uma etapa de verificação que faz uma pergunta bloqueante espera sua resposta antes de aceitar um resultado bem-sucedido.

Quando um grafo antigo salvo é substituído pela primeira vez por blocos Core, o grafo original é preservado. A biblioteca passa a oferecer **Exportar grafo original**. A exportação tem um nome diferente para permitir a importação como rascunho separado, sem substituir o workflow atual. A conversão e as edições posteriores nunca publicam um loop automaticamente.

Use **Definir variáveis** para preservar o estado durante uma pausa: defina valores JSON tipados ou ajuste um contador inteiro existente. Esta peça não faz chamadas à IA. Todas as alterações são guardadas em conjunto; um contador inválido deixa todas as variáveis intactas. As variáveis de um componente mapeado permanecem locais a esse componente.

No Decider, **Continuar enquanto esta condição se verificar** protege o trabalho obrigatório pendente. Por exemplo, `$vars.failedPass == true` transforma uma proposta de paragem em continuação até o workflow limpar esse indicador. A decisão continua a ser executada e as repetições sem alterações continuam sujeitas ao limite de falta de progresso. As perguntas humanas continuam a aguardar uma resposta.

Para migrar um loop guardado do motor anterior, escolha **Converter para Core** na biblioteca. Selecione o repositório original quando um passo shell não tiver um âmbito explícito. A conversão valida o grafo e guarda um rascunho com uma cópia exportável do original. Reveja as ligações e publique explicitamente. Loops em execução não podem ser convertidos; alterações concorrentes são preservadas. Os passos de escrita exigem comandos reais de verificação e Quick SDD utiliza o OpenSpec incluído no Core. Atualize o Core se a conversão não estiver disponível.

Para ver que loops guardados precisam de atenção, abra **Verificação da migração para o Core** na biblioteca e escolha **Verificar**. Lista os loops que o Core instalado rejeita, os que estão prontos a converter e os que precisam de um repositório ou de outra correção. Nunca converte nem publica nada por si.

Um Core futuro que execute apenas workflows Core não inicia num rail um loop não convertido. O Desktop mostra uma mensagem que remete para **Converter para Core**, em vez de iniciar uma execução que falharia a meio. As execuções já iniciadas mantêm a versão do Core que as criou.
