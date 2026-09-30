# Providers de IA (Claude, Codex)

O Specrails não está preso a uma única IA. Todas as partes da app que falam com uma IA — Explore Spec, spec rápida (Quick), rails, chat, AI Edit, o botão "Open AI CLI" do terminal — podem correr através de qualquer um dos dois providers de primeira linha. Você escolhe quais é que cada projeto usa e pode até alternar tarefa a tarefa.

## Os dois providers

| Provider | CLI | Feito por | Notas |
|---|---|---|---|
| **Claude** | `claude` | Anthropic | O mais completo. O único provider para Agentes (perfis) e rails Freestyle, e para o Contract Refine. |
| **Codex** | `codex` | OpenAI | Requer codex `0.128.0+`. Lê os seus servidores MCP a partir do `~/.codex/config.toml` global. |

## Instalar um provider para um projeto

Quando adiciona um projeto, o assistente de configuração pergunta qual ou quais providers instalar. Escolha um, avance pelo passo de instalação e está feito. A partir daí o projeto simplesmente *tem* esse provider — nunca mais precisa de pensar nisso. Specs, rails, chat e analytics funcionam todos da mesma forma, independentemente do que escolheu.

Se um CLI que quer não aparecer em Adicionar Projeto, é quase sempre porque o CLI não está instalado ou não está no seu `PATH`. Instale-o e volte a abrir Adicionar Projeto.

## Instalar vários providers num só projeto

Algumas coisas que vale a pena saber sobre projetos multi-provider:

- **Com um só provider, tudo se comporta exatamente como antes.** Se um projeto tiver apenas um provider, nunca verá um seletor de provider em lado nenhum — a app mantém-se limpa e simples.
- **A barra lateral direita só mostra as secções que todos os providers instalados suportam.** Como os Agentes (perfis) são um conceito exclusivo do Claude, a secção **Agentes** desaparece assim que um projeto inclui qualquer provider que não seja Claude. Todo o resto (Specs, Código, Analytics, Integrações, Terminal, Chat) permanece.
- **A escolha de providers fica fixada após a criação.** Nesta versão escolhe os seus providers quando adiciona o projeto e não podem ser alterados mais tarde nas Definições. Se precisar de uma combinação diferente, isso é um projeto novo.

## Escolher um provider a cada invocação

A grande vantagem de um projeto multi-provider é poder escolher a IA certa para cada tarefa — sem mexer em nenhuma definição global. Sempre que uma IA corre, aparece um pequeno seletor de provider (apenas quando o projeto tem mais do que um):

- **Adicionar Spec** — um seletor de motor permite-lhe Explorar ou gerar rapidamente (Quick) uma spec com o provider que preferir.
- **Cabeçalho do rail** — escolha o motor para esse rail específico antes de o lançar.
- **Terminal** — o botão "Open AI CLI" (Sparkles) abre um menu de providers para que possa entrar em qualquer CLI instalado na diretoria desse projeto.

A sua escolha é guardada por projeto, predefinida para o provider primário, para que não tenha de a repetir de cada vez.

## O que só o Claude consegue fazer

Algumas funcionalidades são, por natureza, específicas do Claude, por isso ficam escondidas ou são ignoradas quando outro provider está em jogo:

- **Agentes (perfis)** — o catálogo de agentes por projeto e o roteamento de modelos. Escondido em qualquer projeto que inclua um provider que não seja Claude.
- **Rails Freestyle** — correm sempre no Claude.
- **Contract Refine** — a passagem extra de "Contract Layer" sobre uma spec confirmada só corre quando o provider da conversa é o Claude.
- **Modos avançados de Adicionar Spec** (SMASH / Contract Layer) — escondidos para motores que não sejam Claude.

Todo o resto — Explore, spec rápida (Quick), o pipeline completo de rails, AI Edit, chat, analytics de custos — funciona nos dois.

## Resolução de problemas

- **Os servidores MCP do Codex não carregam no chat.** O Codex lê os servidores MCP a partir do `~/.codex/config.toml` global — registe-os aí com `codex mcp add`.
