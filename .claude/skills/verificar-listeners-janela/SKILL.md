---
name: verificar-listeners-janela
description: Verifica que nenhum handler de on_window_event mexe na própria janela de forma síncrona (deadlock da thread principal no Windows).
---
Contexto: o tauri-runtime-wry chama os handlers de `on_window_event` com o `Mutex` dos listeners travado. No Windows, `set_position`, `hide`, `show`, `set_focus` e afins mandam mensagens síncronas que disparam outro evento e reentram no handler, travando o app ("Não respondendo", CPU baixa).

1. `cargo check` em `src-tauri` sem erros.
2. Revise cada `on_window_event` (`Grep "on_window_event" src-tauri/src`): toda chamada que mexe em janela dentro do handler deve estar em `app.run_on_main_thread(move || ...)`.
3. No app (build do release): arraste o dock de agentes até a borda com "manter na tela" ligado; abra o popover do tray e o overlay e clique fora várias vezes. Esperado: nada trava.
4. Se travar: capture pilhas com um script dbghelp/StackWalk64 no `pandacode.exe`. Thread principal em `WaitOnAddress` dentro de um wndproc aninhado (PeekMessage) = reentrância de listener.
