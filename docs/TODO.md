# ShotGo — TODO for Next Session

## Priority 1: Migrar para Tailwind CSS v4

### O que fazer
- Instalar Tailwind CSS v4 + `@tailwindcss/vite` no frontend
- Configurar em `vite.config.ts`
- Criar `tailwind.config.ts` com os design tokens atuais:
  - Colors: bg (#121218), surface (#1c1c26), accent (#6C5CE7), etc.
  - Spacing, radius, font — tudo de `src/styles/tokens.ts`
- Migrar TODOS os componentes de inline `style={}` para classes Tailwind
- Remover `src/styles/tokens.ts`, `buttons.ts`, `layout.ts` (absorvidos pelo Tailwind)
- Remover `src/components/HoverBtn.tsx` (usar `hover:` classes)
- Atualizar `global.css` para usar `@tailwind base/components/utilities`
- Testar cada view: IdleView, Welcome, Editor, Recorder, Settings

### Arquivos a migrar
- `src/App.tsx` / `src/components/IdleView.tsx`
- `src/components/onboarding/Welcome.tsx` + `PermissionCard.tsx`
- `src/components/editor/EditorCanvas.tsx` + `Toolbar.tsx` + `InteractiveCanvas.tsx`
- `src/components/recorder/RecorderControls.tsx` + `SourcePicker.tsx` + `RecordingPreview.tsx`
- `src/components/settings/SettingsWindow.tsx` + `OutputSection.tsx` + `HotkeyConfig.tsx`
- `src/components/Toast.tsx`
- Todos os `*Styles.ts` files — deletar após migração

### Regras
- Cada arquivo ≤ 100 linhas
- Selects devem ficar bonitos (usar `@headlessui/react` ou custom select com Tailwind)
- Inputs/selects/buttons com hover, focus-visible, transitions via classes

---

## Priority 2: Floating Capture Bar (estilo CleanShot X)

### O que é
Após tirar uma screenshot, em vez de abrir o editor na janela principal, mostrar uma **barra flutuante pequena no rodapé do monitor**. A barra fica fixa ali até o usuário tomar uma ação.

### UX esperado
1. User tira screenshot (hotkey ou tray)
2. Janela do ShotGo NÃO abre
3. Uma barra pequena (~400x80px) aparece no bottom-center da tela
4. Barra mostra: thumbnail da captura + botões: Save, Copy, Edit, Delete
5. Se clicar Edit → aí sim abre a janela principal com o editor
6. Se clicar Save/Copy → salva/copia e a barra some
7. Se clicar Delete ou esperar 30s → barra some
8. Múltiplas capturas podem empilhar (como CleanShot X)

### Implementação técnica
- **Opção A (Wails)**: Após captura, redimensionar a janela Wails para 400x80, posicionar no bottom-center com `runtime.WindowSetPosition` + `runtime.WindowSetSize`, setar frameless/always-on-top. Problema: Wails v2 não suporta mudar frameless em runtime.
- **Opção B (HTML overlay)**: Manter a janela Wails fullscreen transparente como overlay, renderizar a barra no bottom via CSS. Problema: precisa de janela transparente + click-through.
- **Opção C (Processo separado)**: Criar uma segunda janela/processo que é só a barra. Comunica via IPC. Mais complexo mas mais correto.
- **Recomendação**: Começar com **Opção A simplificada** — após captura, mostrar a janela Wails pequena no canto inferior com apenas os botões de ação. Não é perfeito mas é funcional.

### Mudanças necessárias
- **Backend**: `CaptureFullscreen`/`CaptureInteractive` não devem abrir o editor automaticamente. Devem retornar os dados e o frontend decide.
- **Frontend**: Novo componente `CaptureBar.tsx` que renderiza no bottom da janela
- **Frontend**: `App.tsx` precisa de um novo view state "capture-bar"
- **Backend**: Novos bindings para posicionar janela: `SetWindowAsBar()` (pequena, bottom-center) e `SetWindowAsMain()` (normal, centered)

---

## Priority 3: Bugs pendentes

### Windows tela preta na captura
- DPI awareness foi adicionado (`SetProcessDpiAwareness(2)`)
- Precisa testar num Windows real — pode precisar de `SetThreadDpiAwarenessContext` em vez de process-level
- Se ainda não funcionar, usar `user32.GetWindowDC(0)` em vez de `GetDC(0)`

### Tray icon não mostra o ícone customizado
- O remotray `WithIcon([]byte)` recebe PNG bytes
- O PNG (44x44, branco em transparente) pode não renderizar bem como template image
- Testar se o remotray suporta template icons ou se precisa de ícone preto
- Alternativa: gerar versão preta do ícone para tray

### Recording: selecionar parte da tela
- O recorder aceita `region *entity.Region` e usa `-vf crop=w:h:x:y`
- O frontend `SourcePicker` não tem opção "Custom Region"
- Precisa: adicionar opção "Custom Region" → abre overlay de seleção → passa coords
- O overlay de seleção já existe (`SelectionOverlay.tsx` / `RegionSelector.tsx`) mas precisa de ajuste

### Recording: selecionar janela específica
- `ListRecordableWindows()` lista apps visíveis via osascript
- Mas gravar uma janela específica no macOS requer: capturar tela inteira e usar `-vf crop` com as coordenadas da janela
- Precisa: obter bounds da janela via `CGWindowListCopyWindowInfo` e passar como region

### Show in Finder
- `RevealFile` funciona mas pode falhar se o arquivo não existir ainda (race condition com ffmpeg finalizando)
- Adicionar check `os.Stat(path)` antes de chamar `open -R`
- Se não existir, mostrar toast de erro

---

## Priority 4: Melhorias de UX

### Editor
- `prompt()` para texto é feio — substituir por inline text input no canvas
- Adicionar color picker para ferramentas (arrow, text)
- Preview em tempo real ao arrastar (ghost line para arrow, ghost rect para blur)
- Crop funcional (atualmente só tem o tool mas não faz nada)

### Settings
- Save directory: usar dialog nativo (`runtime.OpenDirectoryDialog`) em vez de text input
- Hotkey re-bind: mostrar feedback visual melhor ao capturar teclas
- Resetar para defaults

### Onboarding
- Accessibility permission check (para hotkeys globais)
- Guiar melhor o usuário quando permissão é negada

### Auto-update
- `internal/infrastructure/updater/updater.go` é stub
- Implementar check de GitHub Releases API no startup
- Mostrar notificação quando nova versão disponível
- Download + replace do binário

---

## Priority 5: Preparar v0.1.0 Release

### Antes de tagar
- [ ] Testar build macOS (.app + DMG + assinatura + notarização)
- [ ] Testar build Windows (x64 .exe)
- [ ] Testar ffmpeg embed funciona na release
- [ ] Verificar todos os hotkeys funcionam
- [ ] Verificar tray icon funciona no .app buildado
- [ ] Testar captura fullscreen + region em ambos OS
- [ ] Testar recording start/stop + arquivo persiste
- [ ] Screenshot: README com GIFs demonstrando as features

### Comando para release
```bash
git tag v0.1.0
git push origin v0.1.0
# GitHub Actions builda macOS + Windows e publica na Release
```

---

## Contexto técnico para nova sessão

### Stack
- Go 1.24, Wails v2.12, React 18, TypeScript 6, Zustand, Vite 3
- Linting: golangci-lint v2.11.4, oxlint, oxfmt, tsgo
- Pre-commit: lefthook
- Tray: remotray (IPC, processo separado)
- Hotkeys: golang.design/x/hotkey
- Recording: ffmpeg (avfoundation macOS, gdigrab Windows)
- Certificado: Developer ID Application: Willian Sugiyama (GHSUN7X4H6)

### Regras do projeto
- **Max 100 linhas por arquivo** (Go e TS/TSX)
- **Clean Architecture**: domain → usecase → adapter → app
- **Conventional Commits**: feat/fix/style/chore/ci
- **Não commitar sem testar**
- **Não criar issues sem pedir**

### Arquivos-chave
- `main.go` — entrypoint Wails
- `internal/app/lifecycle.go` — startup/shutdown
- `internal/app/tray.go` — remotray setup
- `internal/app/dock_darwin.go` — hide from Dock via CGo
- `internal/adapter/capture/darwin.go` — screencapture
- `internal/adapter/recorder/darwin.go` — ffmpeg avfoundation
- `internal/adapter/recorder/screen_darwin.go` — findScreenIndex
- `frontend/src/App.tsx` — view router
- `frontend/src/components/IdleView.tsx` — main buttons
- `frontend/src/components/recorder/` — source picker, controls, preview

### Config path
- macOS: `~/Library/Application Support/ShotGo/config.json`
- Recordings: `~/Pictures/ShotGo/`

### Certificado Apple (secrets no GitHub)
- APPLE_CERTIFICATE_BASE64, APPLE_CERTIFICATE_PASSWORD
- APPLE_ID (sugiyamawillian@gmail.com), APPLE_TEAM_ID (GHSUN7X4H6)
- APPLE_APP_PASSWORD (revogar e gerar nova — a atual foi exposta nesta conversa)

### Resetar permissões (precisa fazer antes de testar onboarding)
```bash
tccutil reset ScreenCapture com.wails.ShotGo
tccutil reset ScreenCapture com.apple.Terminal
```
