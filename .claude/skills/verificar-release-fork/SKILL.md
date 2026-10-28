---
name: verificar-release-fork
description: Verifica o release automático do fork (Windows x64) e o atualizador apontando para o fork.
---
1. Push na main do fork dispara `fork-release.yml`; acompanhar com `gh run watch -R renanrmsantos14/pandacode`.
2. Esperado: job verde, commit `release: vX`, tag `vX` e release com instalador, `.sig` e `latest.json`.
3. `gh release view vX -R renanrmsantos14/pandacode` deve listar `latest.json`.
4. `src-tauri/tauri.conf.json`: `endpoints` aponta para o fork e `pubkey` é a de `~/.tauri/pandacode-fork.key.pub`.
5. Segredos necessários: TAURI_SIGNING_PRIVATE_KEY e TAURI_SIGNING_PRIVATE_KEY_PASSWORD.
