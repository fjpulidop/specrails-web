<!-- guide-revision: mission-first-v1 -->

# Reveja e aceite a entrega

Uma implementação produz alterações e evidências para rever. Testes de base bem-sucedidos não provam que a funcionalidade pedida foi implementada.

## Escolha a ação

Integrar localmente aplica o trabalho ao ramo de integração verificado. Checkout move o ramo de trabalho para a pasta local do repositório; isso não aceita a spec. Antes de uma PR, verifique repositório, ramo de destino e diff. Um worktree é um checkout Git isolado, não um espaço alojado no GitHub.

## Preserve os resultados parciais

Com vários repositórios, reveja cada entrega, incluindo os resultados explicitamente sem alterações. A integração não é uma transação atómica entre repositórios: as entregas aceites continuam registadas se outra ação falhar.

Perante conflitos ou uma base alterada, preserve as alterações locais, leia o erro e repita apenas a ação pendente. Não apague um worktree só para esconder um cartão. Uma revisão mantém o âmbito congelado e o contexto da entrega anterior.
