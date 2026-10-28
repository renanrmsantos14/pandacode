---
name: verificar-catalogo-modelos
description: Verifica que o seletor de modelos do PandaCode carrega o catálogo do Claude Code e do Codex após mudanças em providers.rs.
---
1. `npm run package:fast` (≈25 min na primeira vez) ou `cargo check --manifest-path src-tauri/Cargo.toml`.
2. Abrir `src-tauri/target/fast-release/pandacode.exe`, abrir o seletor de modelos e clicar em Claude Code.
3. Esperado: lista de modelos carregada; sem "model catalog frame is too large". O erro de GitHub Copilot CLI ausente é independente.
4. Limites atuais: frame do catálogo 4 MB (Claude e Codex), até 1000 entradas.
