---
name: verificar-perguntas-claude
description: Verifica que perguntas do Claude (AskUserQuestion) viram cartão clicável e que a instrução de próximo passo aparece como cartão com botões.
---
1. Testes: `cargo test --manifest-path src-tauri/Cargo.toml --lib claude_ask_user_question` (ou o workflow "Fork test" no GitHub). Devem passar 3 testes: cartão + resposta por texto da pergunta, cancelamento/parada negam, entrada sem perguntas cai em negação.
2. No app: pedir ao Claude "me faça uma pergunta de múltipla escolha com a ferramenta AskUserQuestion". Esperado: cartão com as opções clicáveis e campo livre; ao clicar, o Claude segue com a resposta escolhida.
3. Casos de borda: parar o agente com a pergunta aberta (a pergunta some, sem travar); mais de 3 perguntas ou opções inválidas (cai no aviso de responder em texto).
4. Próximo passo: ao fim de um turno que depende do usuário, aparece um cartão `ui` com título-pergunta, recap e 1-3 botões; clicar coloca a mensagem no compositor. Sem pendência, não aparece cartão.
