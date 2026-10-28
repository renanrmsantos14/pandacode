---
name: verificar-listeners-janela
description: Verifica que nenhum handler de on_window_event mexe na própria janela de forma síncrona (deadlock da thread principal no Windows).
---
Contexto: o tauri-runtime-wry chama os handlers de `on_window_event` com o `Mutex` dos listeners travado. No Windows, `set_position`, `hide`, `show`, `set_focus` e afins mandam mensagens síncronas que disparam outro evento e reentram no handler, travando o app ("Não respondendo", CPU baixa).

1. `cargo check` em `src-tauri` sem erros.
2. Revise cada `on_window_event` (`Grep "on_window_event" src-tauri/src`): toda chamada que mexe em janela dentro do handler deve estar em `app.run_on_main_thread(move || ...)`.
3. No app (build do release): arraste o dock de agentes até a borda com "manter na tela" ligado; abra o popover do tray e o overlay e clique fora várias vezes. Esperado: nada trava.
4. Patch do tao em `src-tauri/patches/tao` (via `[patch.crates-io]`): `Grep "PandaCode patch" src-tauri/patches/tao` deve achar os dois `try_lock` (KEY_EVENT_BUILDERS e LAYOUT_CACHE) e o `Cargo.lock` deve listar `tao` sem `source`. Ao atualizar o Tauri, confira se o tao novo já corrigiu a reentrância antes de remover o patch.
5. Teste do teclado: digite rápido no prompt enquanto abre/fecha o popover do tray e alterna entre janelas (Alt+Tab). Esperado: sem travamento.
6. Se travar: capture pilhas com um script dbghelp/StackWalk64 no `pandacode.exe`. Thread principal em `WaitOnAddress` dentro de um wndproc aninhado (PeekMessage) = reentrância de listener.
