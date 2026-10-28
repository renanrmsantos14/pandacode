---
name: verificar-seletor-fonte
description: Verifica o seletor de fonte "Aa" no cabeçalho da sessão (PandaCode, Claude style, Codex style) no modo de pré-visualização.
---
1. `npx tsc --noEmit` deve passar.
2. `npm run dev` (porta 1420) e abrir http://127.0.0.1:1420 no navegador embutido (modo com dados de exemplo).
3. Clicar no botão "Aa" no canto superior esquerdo do cabeçalho da sessão: menu com 3 opções, a atual marcada.
4. Escolher "Codex style": `document.documentElement.style.fontFamily` começa com "Geist Variable", `--mono` vira "Geist Mono Variable" e `document.fonts` lista as duas como `loaded`. Escolher "Claude style": lista começa com "Anthropic Sans", carrega "Hanken Grotesk Variable" e `--mono` volta ao padrão.
5. Recarregar a página: a escolha continua (`localStorage pandacode.font`). "PandaCode" remove os dois estilos inline.
6. Limpar `pandacode.font` e parar o servidor ao terminar. A fonte proprietária "Anthropic Sans" nunca entra no repositório; ela só aparece como nome na lista.
