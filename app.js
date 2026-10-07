/**
 * TIERCRAFT - CUSTOM TIERLIST MAKER
 * Static Single Page Application
 */

(function () {
  'use strict';

  // LocalStorage Keys
  const STORAGE_KEY = 'tiercraft_app_data_v1';
  const THEME_STORAGE_KEY = 'tiercraft_theme_settings';

  // Default Theme Configuration & Presets
  const DEFAULT_THEME = {
    id: 'dark',
    font: 'Outfit',
    customColors: {
      bgDark: '#0b0d14',
      bgCard: '#131722',
      accentPrimary: '#6366f1',
      textMain: '#f8fafc'
    }
  };

  const THEME_PRESETS = {
    dark: {
      name: 'Escuro',
      icon: '🌙',
      defaultFont: 'Outfit',
      colors: {
        bgDark: '#0b0d14',
        bgCard: '#131722',
        accentPrimary: '#6366f1',
        textMain: '#f8fafc'
      }
    },
    light: {
      name: 'Claro',
      icon: '☀️',
      defaultFont: 'Outfit',
      colors: {
        bgDark: '#f8fafc',
        bgCard: '#ffffff',
        accentPrimary: '#4f46e5',
        textMain: '#0f172a'
      }
    },
    cyberpunk: {
      name: 'Cyberpunk',
      icon: '⚡',
      defaultFont: 'Space Grotesk',
      colors: {
        bgDark: '#05060f',
        bgCard: '#0d1020',
        accentPrimary: '#f43f5e',
        textMain: '#f8fafc'
      }
    },
    retro: {
      name: 'Retro Arcade',
      icon: '🕹️',
      defaultFont: 'Press Start 2P',
      colors: {
        bgDark: '#14121e',
        bgCard: '#201c31',
        accentPrimary: '#ffb000',
        textMain: '#f5f5f7'
      }
    },
    midnight: {
      name: 'Midnight OLED',
      icon: '🌌',
      defaultFont: 'Outfit',
      colors: {
        bgDark: '#000000',
        bgCard: '#0d0d0d',
        accentPrimary: '#3b82f6',
        textMain: '#ffffff'
      }
    },
    forest: {
      name: 'Floresta Esmeralda',
      icon: '🌲',
      defaultFont: 'Plus Jakarta Sans',
      colors: {
        bgDark: '#061612',
        bgCard: '#0d231e',
        accentPrimary: '#10b981',
        textMain: '#f0fdf4'
      }
    },
    custom: {
      name: 'Personalizado',
      icon: '🎨',
      defaultFont: 'Outfit',
      colors: {
        bgDark: '#0b0d14',
        bgCard: '#131722',
        accentPrimary: '#6366f1',
        textMain: '#f8fafc'
      }
    }
  };

  const FONT_MAP = {
    'Outfit': "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
    'Plus Jakarta Sans': "'Plus Jakarta Sans', sans-serif",
    'Inter': "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    'Space Grotesk': "'Space Grotesk', sans-serif",
    'Fredoka': "'Fredoka', cursive, sans-serif",
    'Press Start 2P': "'Press Start 2P', monospace, cursive"
  };

  // Default Presets Configuration
  const PRESETS = {
    standard: [
      { id: 'row-s', label: 'S', color: '#ff4757', items: [] },
      { id: 'row-a', label: 'A', color: '#ffa502', items: [] },
      { id: 'row-b', label: 'B', color: '#eccc68', items: [] },
      { id: 'row-c', label: 'C', color: '#2ed573', items: [] },
      { id: 'row-d', label: 'D', color: '#1e90ff', items: [] }
    ],
    gaming: [
      { id: 'row-sss', label: 'God Tier', color: '#ec4899', items: [] },
      { id: 'row-s', label: 'S', color: '#ff4757', items: [] },
      { id: 'row-a', label: 'A', color: '#ffa502', items: [] },
      { id: 'row-b', label: 'B', color: '#eccc68', items: [] },
      { id: 'row-c', label: 'C', color: '#2ed573', items: [] },
      { id: 'row-f', label: 'F', color: '#718093', items: [] }
    ],
    simple: [
      { id: 'row-excelente', label: 'Excelente', color: '#2ed573', items: [] },
      { id: 'row-bom', label: 'Bom', color: '#1e90ff', items: [] },
      { id: 'row-neutro', label: 'Neutro', color: '#eccc68', items: [] },
      { id: 'row-ruim', label: 'Ruim', color: '#ff4757', items: [] }
    ],
    empty: []
  };

  // Effects are provided locally: bundled assets or sounds synthesized in the browser.
  const SOUND_LIBRARY = {
    swoosh: { label: 'Swoosh', src: 'assets/sounds/swoosh.mp3' },
    pop: { label: 'Pop', synth: true },
    achievement: { label: 'Achievement', synth: true },
    sparkle: { label: 'Sparkle', synth: true },
    impact: { label: 'Impact', synth: true },
    fail: { label: 'Fail', synth: true },
    applause: { label: 'Applause', synth: true }
  };

  let audioContext = null;

  // State
  let state = {
    activeTierListId: 'default',
    theme: JSON.parse(JSON.stringify(DEFAULT_THEME)),
    tierLists: {
      'default': {
        id: 'default',
        title: 'Minha Tier List Customizada',
        description: 'Clique no título/descrição para editar. Arraste os itens para organizar sua classificação.',
        rows: JSON.parse(JSON.stringify(PRESETS.standard)),
        unrankedItems: [
          { id: 'item-1', type: 'text', text: '⭐ Destaque', bgColor: '#6366f1', textColor: '#ffffff' },
          { id: 'item-2', type: 'text', text: '🔥 Épico', bgColor: '#ff4757', textColor: '#ffffff' },
          { id: 'item-3', type: 'text', text: '⚡ Rápido', bgColor: '#ffa502', textColor: '#ffffff' },
          { id: 'item-4', type: 'text', text: '💎 Diamante', bgColor: '#10b981', textColor: '#ffffff' },
          { id: 'item-5', type: 'text', text: '🚀 Futuro', bgColor: '#a855f7', textColor: '#ffffff' }
        ]
      }
    }
  };

  // Currently dragged item id & touch state
  let draggedItemId = null;
  let touchDragElement = null;
  let touchClone = null;
  let editingItemId = null;

  // DOM Elements References
  const selectTierList = document.getElementById('select-tierlist');
  const btnNewTierList = document.getElementById('btn-new-tierlist');
  const btnRenameTierList = document.getElementById('btn-rename-tierlist');
  const btnDeleteTierList = document.getElementById('btn-delete-tierlist');
  const btnExportImage = document.getElementById('btn-export-image');
  const btnBackupModal = document.getElementById('btn-backup-modal');
  const btnResetBoard = document.getElementById('btn-reset-board');

  const tierListTitle = document.getElementById('tierlist-title');
  const tierListDesc = document.getElementById('tierlist-desc');
  const btnAddRow = document.getElementById('btn-add-row');
  const btnSoundSettings = document.getElementById('btn-sound-settings');
  const tierRowsBoard = document.getElementById('tier-rows-board');

  const unrankedItemsContainer = document.getElementById('unranked-items-container');
  const itemsCountBadge = document.getElementById('items-count-badge');
  const emptyBankMsg = document.getElementById('empty-bank-msg');
  const searchItemsInput = document.getElementById('search-items');
  const btnOpenAddItemModal = document.getElementById('btn-open-add-item-modal');

  // Modals
  const modalItem = document.getElementById('modal-item');
  const modalRow = document.getElementById('modal-row');
  const modalBackup = document.getElementById('modal-backup');
  const modalNewList = document.getElementById('modal-new-list');
  const modalSoundSettings = document.getElementById('modal-sound-settings');

  // Item Form Elements
  const fileDropArea = document.getElementById('file-drop-area');
  const itemImageFile = document.getElementById('item-image-file');
  const itemImageUrl = document.getElementById('item-image-url');
  const itemImageLabel = document.getElementById('item-image-label');
  const itemTextTitle = document.getElementById('item-text-title');
  const itemBgColor = document.getElementById('item-bg-color');
  const itemTextColor = document.getElementById('item-text-color');
  const textCardPreview = document.getElementById('text-card-preview');
  const btnSaveItem = document.getElementById('btn-save-item');

  // Row Form Elements
  const editRowId = document.getElementById('edit-row-id');
  const rowLabelInput = document.getElementById('row-label-input');
  const rowCustomColor = document.getElementById('row-custom-color');
  const colorDots = document.querySelectorAll('.color-dot');
  const btnSaveRow = document.getElementById('btn-save-row');
  const btnDeleteRow = document.getElementById('btn-delete-row');
  const rowSoundSelect = document.getElementById('row-sound-select');
  const btnPreviewRowSound = document.getElementById('btn-preview-row-sound');

  const listDefaultSound = document.getElementById('list-default-sound');
  const btnPreviewDefaultSound = document.getElementById('btn-preview-default-sound');
  const btnSaveSoundSettings = document.getElementById('btn-save-sound-settings');

  // New List Form Elements
  const newListTitle = document.getElementById('new-list-title');
  const newListPreset = document.getElementById('new-list-preset');
  const btnConfirmNewList = document.getElementById('btn-confirm-new-list');

  // Backup Elements
  const btnDownloadJson = document.getElementById('btn-download-json');
  const inputImportJson = document.getElementById('input-import-json');
  const jsonPreview = document.getElementById('json-preview');
  const btnApplyJsonText = document.getElementById('btn-apply-json-text');

  // AI Import Elements
  const modalImportAi = document.getElementById('modal-import-ai');
  const btnHeaderAiImport = document.getElementById('btn-header-ai-import');
  const btnImportAiList = document.getElementById('btn-import-ai-list');
  const btnSwitchToAiImport = document.getElementById('btn-switch-to-ai-import');
  const inputImportSingleJson = document.getElementById('input-import-single-json');
  const aiJsonInput = document.getElementById('ai-json-input');
  const btnConfirmImportSingle = document.getElementById('btn-confirm-import-single');
  const importJsonError = document.getElementById('import-json-error');
  const btnCopyAiPrompt = document.getElementById('btn-copy-ai-prompt');
  const aiPromptTemplateEl = document.getElementById('ai-prompt-template');
  const aiJsonExampleEl = document.getElementById('ai-json-example');

  // Canvas
  const exportCanvas = document.getElementById('export-canvas');

  // Theme & Typography Elements
  const modalTheme = document.getElementById('modal-theme');
  const btnThemeModal = document.getElementById('btn-theme-modal');
  const themeBtnIcon = document.getElementById('theme-btn-icon');
  const themeBtnLabel = document.getElementById('theme-btn-label');
  const fontLivePreview = document.getElementById('font-live-preview');
  const customColorBg = document.getElementById('custom-color-bg');
  const customColorCard = document.getElementById('custom-color-card');
  const customColorAccent = document.getElementById('custom-color-accent');
  const customColorText = document.getElementById('custom-color-text');
  const hexValBg = document.getElementById('hex-val-bg');
  const hexValCard = document.getElementById('hex-val-card');
  const hexValAccent = document.getElementById('hex-val-accent');
  const hexValText = document.getElementById('hex-val-text');
  const btnApplyCustomColors = document.getElementById('btn-apply-custom-colors');
  const btnResetDefaultTheme = document.getElementById('btn-reset-default-theme');
  const metaThemeColor = document.getElementById('meta-theme-color');

  // ==========================================
  // PWA SUPPORT & INSTALLATION MANAGER
  // ==========================================

  let deferredInstallPrompt = null;

  function showNotificationToast(message, duration = 3200) {
    let toast = document.getElementById('app-notification-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-notification-toast';
      toast.className = 'app-notification-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  function setupPWA() {
    const btnInstall = document.getElementById('btn-pwa-install');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone === true ||
                         document.referrer.includes('android-app://');

    // Register Service Worker for offline capability
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((registration) => {
            console.log('[TierCraft PWA] Service Worker registrado:', registration.scope);

            // Listen for service worker updates
            registration.addEventListener('updatefound', () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.addEventListener('statechange', () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    showNotificationToast('Nova versão disponível! Recarregue para atualizar.', 4000);
                  }
                });
              }
            });
          })
          .catch((err) => {
            console.warn('[TierCraft PWA] Falha ao registrar Service Worker:', err);
          });
      });
    }

    // PWA Install prompt handling
    if (btnInstall) {
      if (isStandalone) {
        btnInstall.style.display = 'none';
        return;
      }

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      // On iOS Safari, beforeinstallprompt does not fire; show install button to provide guide modal
      if (isIOS) {
        btnInstall.style.display = 'inline-flex';
        btnInstall.addEventListener('click', () => {
          const modalIOS = document.getElementById('modal-ios-install');
          if (modalIOS) openModal(modalIOS);
        });
      }

      // Android / Chromium / Desktop beforeinstallprompt
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredInstallPrompt = e;
        btnInstall.style.display = 'inline-flex';
      });

      btnInstall.addEventListener('click', async () => {
        if (deferredInstallPrompt) {
          deferredInstallPrompt.prompt();
          const { outcome } = await deferredInstallPrompt.userChoice;
          if (outcome === 'accepted') {
            console.log('[TierCraft PWA] Usuário aceitou a instalação.');
            btnInstall.style.display = 'none';
          }
          deferredInstallPrompt = null;
        } else if (!isIOS) {
          // If clicked and not iOS and no prompt captured
          showNotificationToast('Para instalar, clique no menu do navegador e selecione "Instalar aplicativo" ou "Adicionar à Tela Inicial".', 4500);
        }
      });

      // Successfully installed event
      window.addEventListener('appinstalled', () => {
        console.log('[TierCraft PWA] Aplicativo instalado com sucesso!');
        btnInstall.style.display = 'none';
        deferredInstallPrompt = null;
        showNotificationToast('🎉 TierCraft instalado com sucesso! Acesse direto da sua tela inicial.');
      });
    }
  }

  // ==========================================
  // THEME & TYPOGRAPHY MANAGER ENGINE
  // ==========================================

  function applyTheme(themeConfig, notify = false) {
    if (!themeConfig) return;
    const themeId = themeConfig.id || 'dark';
    const fontName = themeConfig.font || 'Outfit';
    const preset = THEME_PRESETS[themeId] || THEME_PRESETS['dark'];

    // 1. Set data-theme attribute on root
    document.documentElement.setAttribute('data-theme', themeId);

    // 2. Clear or set custom inline color overrides
    const docStyle = document.documentElement.style;
    if (themeId === 'custom' && themeConfig.customColors) {
      const colors = themeConfig.customColors;
      if (colors.bgDark) docStyle.setProperty('--bg-dark', colors.bgDark);
      if (colors.bgCard) docStyle.setProperty('--bg-card', colors.bgCard);
      if (colors.accentPrimary) docStyle.setProperty('--accent-primary', colors.accentPrimary);
      if (colors.textMain) docStyle.setProperty('--text-main', colors.textMain);

      // Derived properties for custom theme
      docStyle.setProperty('--tier-board-bg', colors.bgDark);
      docStyle.setProperty('--tier-row-bg', colors.bgCard);
      docStyle.setProperty('--modal-footer-bg', colors.bgDark);

      // Update custom card preview in modal
      const customBgDot = document.getElementById('preview-dot-custom-bg');
      const customCardDot = document.getElementById('preview-dot-custom-card');
      const customAccentDot = document.getElementById('preview-dot-custom-accent');
      if (customBgDot) customBgDot.style.background = colors.bgDark;
      if (customCardDot) customCardDot.style.background = colors.bgCard;
      if (customAccentDot) customAccentDot.style.background = colors.accentPrimary;
    } else {
      // For preset themes, remove inline color overrides so CSS preset variables take effect
      docStyle.removeProperty('--bg-dark');
      docStyle.removeProperty('--bg-card');
      docStyle.removeProperty('--accent-primary');
      docStyle.removeProperty('--text-main');
      docStyle.removeProperty('--tier-board-bg');
      docStyle.removeProperty('--tier-row-bg');
      docStyle.removeProperty('--modal-footer-bg');
    }

    // 3. Apply font
    const fontCss = FONT_MAP[fontName] || FONT_MAP['Outfit'];
    docStyle.setProperty('--font-main', fontCss);
    docStyle.setProperty('--font-body', fontCss);

    // 4. Update meta theme-color tag for mobile PWA status bar
    if (metaThemeColor) {
      const activeBg = (themeId === 'custom' && themeConfig.customColors)
        ? themeConfig.customColors.bgDark
        : (preset.colors ? preset.colors.bgDark : '#0b0d14');
      metaThemeColor.setAttribute('content', activeBg);
    }

    // 5. Update header button icon & label
    if (themeBtnIcon) themeBtnIcon.textContent = preset.icon || '🎨';
    if (themeBtnLabel) themeBtnLabel.textContent = preset.name || 'Tema';

    // 6. Update active UI classes inside Theme Modal
    updateThemeModalUI(themeConfig);

    // 7. Persist to state and localStorage
    state.theme = themeConfig;
    saveState();
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeConfig));
    } catch (e) {
      console.warn('Erro ao salvar tema no localStorage:', e);
    }

    // 8. Notification feedback if requested
    if (notify) {
      showNotificationToast(`🎨 Tema "${preset.name}" (${fontName}) ativado!`);
      playSynthSound('pop');
    }
  }

  function updateThemeModalUI(themeConfig) {
    if (!modalTheme) return;
    const themeId = themeConfig.id || 'dark';
    const fontName = themeConfig.font || 'Outfit';

    // Highlight active preset card
    document.querySelectorAll('.theme-card').forEach(card => {
      card.classList.toggle('active', card.dataset.themeId === themeId);
    });

    // Highlight active font chip
    document.querySelectorAll('.font-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.font === fontName);
    });

    // Update live font sample
    if (fontLivePreview) {
      const fontCss = FONT_MAP[fontName] || FONT_MAP['Outfit'];
      fontLivePreview.style.fontFamily = fontCss;
      fontLivePreview.textContent = `Fonte ${fontName}: O rápido gavião voa sobre as montanhas • TierCraft 2026`;
    }

    // Populate custom color pickers with current custom colors (or active preset colors)
    const customColors = themeConfig.customColors || (THEME_PRESETS[themeId] ? THEME_PRESETS[themeId].colors : DEFAULT_THEME.customColors);
    if (customColorBg) {
      customColorBg.value = customColors.bgDark || '#0b0d14';
      if (hexValBg) hexValBg.textContent = customColorBg.value;
    }
    if (customColorCard) {
      customColorCard.value = customColors.bgCard || '#131722';
      if (hexValCard) hexValCard.textContent = customColorCard.value;
    }
    if (customColorAccent) {
      customColorAccent.value = customColors.accentPrimary || '#6366f1';
      if (hexValAccent) hexValAccent.textContent = customColorAccent.value;
    }
    if (customColorText) {
      customColorText.value = customColors.textMain || '#f8fafc';
      if (hexValText) hexValText.textContent = customColorText.value;
    }
  }

  function handleUrlActions() {
    try {
      const params = new URLSearchParams(window.location.search);
      const action = params.get('action');
      if (action === 'new') {
        const modalNewList = document.getElementById('modal-new-list');
        if (modalNewList) openModal(modalNewList);
      } else if (action === 'focus' || action === 'presentation') {
        toggleFocusMode(true);
      } else if (action === 'ai' || action === 'import-ai') {
        openAiImportModal();
      } else if (action === 'theme') {
        updateThemeModalUI(state.theme || DEFAULT_THEME);
        openModal(modalTheme);
      }
    } catch (e) {
      console.warn('Erro ao processar URL actions:', e);
    }
  }

  // ==========================================
  // INITIALIZATION & STATE PERSISTENCE
  // ==========================================

  function init() {
    loadState();
    setupEventListeners();
    setupPWA();
    initAiPromptPreview();
    handleUrlActions();
    renderApp();
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.tierLists && Object.keys(parsed.tierLists).length > 0) {
          state = parsed;
        }
      }

      // Ensure state.theme exists and is valid
      if (!state.theme) {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          try {
            state.theme = JSON.parse(savedTheme);
          } catch (err) {
            state.theme = JSON.parse(JSON.stringify(DEFAULT_THEME));
          }
        } else {
          state.theme = JSON.parse(JSON.stringify(DEFAULT_THEME));
        }
      }
      applyTheme(state.theme, false);
    } catch (e) {
      console.warn('Erro ao carregar dados do localStorage:', e);
      state.theme = JSON.parse(JSON.stringify(DEFAULT_THEME));
      applyTheme(state.theme, false);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  }

  function getActiveList() {
    if (!state.tierLists || Object.keys(state.tierLists).length === 0) {
      state.tierLists = {
        'default': {
          id: 'default',
          title: 'Minha Tier List Customizada',
          description: 'Clique no título/descrição para editar. Arraste os itens para organizar sua classificação.',
          rows: JSON.parse(JSON.stringify(PRESETS.standard)),
          unrankedItems: [
            { id: 'item-1', type: 'text', text: '⭐ Destaque', bgColor: '#6366f1', textColor: '#ffffff' },
            { id: 'item-2', type: 'text', text: '🔥 Épico', bgColor: '#ff4757', textColor: '#ffffff' },
            { id: 'item-3', type: 'text', text: '⚡ Rápido', bgColor: '#ffa502', textColor: '#ffffff' },
            { id: 'item-4', type: 'text', text: '💎 Diamante', bgColor: '#10b981', textColor: '#ffffff' },
            { id: 'item-5', type: 'text', text: '🚀 Futuro', bgColor: '#a855f7', textColor: '#ffffff' }
          ]
        }
      };
      state.activeTierListId = 'default';
    }

    if (!state.tierLists[state.activeTierListId]) {
      const firstId = Object.keys(state.tierLists)[0];
      state.activeTierListId = firstId || 'default';
    }

    const list = state.tierLists[state.activeTierListId];

    if (!list.rows || !Array.isArray(list.rows) || list.rows.length === 0) {
      list.rows = JSON.parse(JSON.stringify(PRESETS.standard));
      saveState();
    }

    if (!list.unrankedItems || !Array.isArray(list.unrankedItems)) {
      list.unrankedItems = [];
      saveState();
    }

    // Migrate saved Tier Lists created before sound effects existed.
    if (typeof list.defaultSoundId === 'undefined') {
      list.defaultSoundId = 'swoosh';
      saveState();
    }

    return list;
  }

  // ==========================================
  // RENDERING LOGIC
  // ==========================================

  function renderApp() {
    renderTierListSelector();

    const activeList = getActiveList();
    tierListTitle.textContent = activeList.title || 'Sem título';
    tierListDesc.textContent = activeList.description || '';

    renderRowsBoard(activeList);
    renderUnrankedItems(activeList);
  }

  function renderTierListSelector() {
    selectTierList.innerHTML = '';
    Object.values(state.tierLists).forEach(list => {
      const option = document.createElement('option');
      option.value = list.id;
      option.textContent = list.title;
      if (list.id === state.activeTierListId) {
        option.selected = true;
      }
      selectTierList.appendChild(option);
    });
  }

  function renderRowsBoard(list) {
    tierRowsBoard.innerHTML = '';

    list.rows.forEach((row, index) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'tier-row';
      rowEl.dataset.rowId = row.id;

      // Badge (Left Side)
      const badgeEl = document.createElement('div');
      badgeEl.className = 'tier-badge-container';
      badgeEl.style.backgroundColor = row.color || '#718093';

      const labelEl = document.createElement('span');
      labelEl.className = 'tier-label';
      labelEl.textContent = row.label || 'TIER';
      badgeEl.appendChild(labelEl);

      // Controls on hover (up, down, settings)
      const controlsEl = document.createElement('div');
      controlsEl.className = 'tier-row-controls';
      
      const btnUp = document.createElement('button');
      btnUp.className = 'btn-row-action';
      btnUp.innerHTML = '▲';
      btnUp.title = 'Mover para cima';
      btnUp.onclick = (e) => { e.stopPropagation(); moveRow(index, -1); };

      const btnDown = document.createElement('button');
      btnDown.className = 'btn-row-action';
      btnDown.innerHTML = '▼';
      btnDown.title = 'Mover para baixo';
      btnDown.onclick = (e) => { e.stopPropagation(); moveRow(index, 1); };

      const btnSettings = document.createElement('button');
      btnSettings.className = 'btn-row-action';
      btnSettings.innerHTML = '⚙️';
      btnSettings.title = 'Configurações da linha';
      btnSettings.onclick = (e) => { e.stopPropagation(); openEditRowModal(row); };

      controlsEl.appendChild(btnUp);
      controlsEl.appendChild(btnDown);
      controlsEl.appendChild(btnSettings);
      badgeEl.appendChild(controlsEl);

      badgeEl.onclick = () => openEditRowModal(row);

      // Drop Zone (Right Side)
      const dropzoneEl = document.createElement('div');
      dropzoneEl.className = 'tier-dropzone dropzone';
      dropzoneEl.dataset.rowId = row.id;

      // Items in row
      row.items.forEach(item => {
        const itemEl = createItemElement(item);
        dropzoneEl.appendChild(itemEl);
      });

      attachDropzoneListeners(dropzoneEl);

      rowEl.appendChild(badgeEl);
      rowEl.appendChild(dropzoneEl);
      tierRowsBoard.appendChild(rowEl);
    });
  }

  function renderUnrankedItems(list) {
    unrankedItemsContainer.innerHTML = '';
    const filterText = searchItemsInput.value.toLowerCase().trim();

    const filteredItems = list.unrankedItems.filter(item => {
      if (!filterText) return true;
      if (item.type === 'text') return item.text.toLowerCase().includes(filterText);
      if (item.type === 'image') return (item.label || '').toLowerCase().includes(filterText);
      return true;
    });

    itemsCountBadge.textContent = list.unrankedItems.length;

    if (filteredItems.length === 0) {
      unrankedItemsContainer.appendChild(emptyBankMsg);
      emptyBankMsg.style.display = 'flex';
    } else {
      emptyBankMsg.style.display = 'none';
      filteredItems.forEach(item => {
        const itemEl = createItemElement(item);
        unrankedItemsContainer.appendChild(itemEl);
      });
    }

    attachDropzoneListeners(unrankedItemsContainer);
  }

  function createItemElement(item) {
    const el = document.createElement('div');
    el.className = 'tier-item';
    el.draggable = true;
    el.dataset.itemId = item.id;

    if (item.type === 'image') {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.label || 'Item';
      img.onerror = () => {
        img.style.display = 'none';
        el.classList.add('text-item-style');
        el.style.backgroundColor = '#334155';
        el.style.color = '#f8fafc';
        el.textContent = item.label || 'Sem Foto';
      };
      el.appendChild(img);

      if (item.label) {
        const overlay = document.createElement('div');
        overlay.className = 'item-label-overlay';
        overlay.textContent = item.label;
        el.appendChild(overlay);
      }
    } else if (item.type === 'text') {
      el.classList.add('text-item-style');
      el.style.backgroundColor = item.bgColor || '#2a2d3d';
      el.style.color = item.textColor || '#ffffff';
      el.textContent = item.text || 'Texto';
    }

    // Item actions shown on hover
    const hoverActions = document.createElement('div');
    hoverActions.className = 'item-actions-hover';

    const btnEdit = document.createElement('button');
    btnEdit.className = 'btn-item-action btn-item-edit';
    btnEdit.innerHTML = '&#9998;';
    btnEdit.title = 'Editar item';
    btnEdit.onclick = (e) => {
      e.stopPropagation();
      openEditItemModal(item);
    };

    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn-item-action';
    btnDelete.innerHTML = '&times;';
    btnDelete.title = 'Excluir item';
    btnDelete.onclick = (e) => {
      e.stopPropagation();
      deleteItem(item.id);
    };

    hoverActions.appendChild(btnEdit);
    hoverActions.appendChild(btnDelete);
    el.appendChild(hoverActions);

    // Attach Drag Events and Click/Tap Handlers
    attachItemDragEvents(el, item);

    return el;
  }

  // ==========================================
  // DRAG AND DROP ENGINE (HTML5 + TOUCH)
  // ==========================================

  function attachItemDragEvents(itemEl, item) {
    itemEl.addEventListener('dragstart', (e) => {
      draggedItemId = itemEl.dataset.itemId;
      itemEl.classList.add('dragging');
      e.dataTransfer.setData('text/plain', draggedItemId);
      e.dataTransfer.effectAllowed = 'move';
    });

    itemEl.addEventListener('dragend', () => {
      itemEl.classList.remove('dragging');
      draggedItemId = null;
      document.querySelectorAll('.dropzone').forEach(dz => dz.classList.remove('drag-over'));
    });

    // Touch Support for Mobile & Tablets
    itemEl.addEventListener('touchstart', (e) => {
      if (e.target.closest('.item-actions-hover')) return;
      handleTouchStart(e, item);
    }, { passive: true });

    // Click handler for Desktop or when tap occurs without touch
    itemEl.addEventListener('click', (e) => {
      if (e.target.closest('.item-actions-hover')) return;
      if (!isDraggingTouch && item) {
        openQuickItemModal(item);
      }
    });
  }

  function attachDropzoneListeners(dropzoneEl) {
    dropzoneEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      dropzoneEl.classList.add('drag-over');
    });

    dropzoneEl.addEventListener('dragleave', (e) => {
      if (!dropzoneEl.contains(e.relatedTarget)) {
        dropzoneEl.classList.remove('drag-over');
      }
    });

    dropzoneEl.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzoneEl.classList.remove('drag-over');
      const itemId = e.dataTransfer.getData('text/plain') || draggedItemId;
      const targetRowId = dropzoneEl.dataset.rowId;

      if (itemId && targetRowId) {
        moveItemToRow(itemId, targetRowId);
      }
    });
  }

  // Mobile Touch Drag Helpers
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let isDraggingTouch = false;
  let currentTouchItem = null;

  function handleTouchStart(e, item) {
    const touch = e.touches[0];
    touchDragElement = e.currentTarget;
    draggedItemId = touchDragElement.dataset.itemId;
    currentTouchItem = item;

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartTime = Date.now();
    isDraggingTouch = false;

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchCancel);
  }

  function handleTouchMove(e) {
    const touch = e.touches[0];
    const distX = touch.clientX - touchStartX;
    const distY = touch.clientY - touchStartY;
    const distance = Math.hypot(distX, distY);

    if (!isDraggingTouch) {
      if (distance > 8) {
        isDraggingTouch = true;
        if (touchDragElement) {
          touchDragElement.classList.add('dragging');
          touchClone = touchDragElement.cloneNode(true);
          touchClone.style.position = 'fixed';
          touchClone.style.pointerEvents = 'none';
          touchClone.style.zIndex = '9999';
          touchClone.style.opacity = '0.9';
          touchClone.style.transform = 'scale(1.1)';
          touchClone.style.left = `${touch.clientX - 32}px`;
          touchClone.style.top = `${touch.clientY - 32}px`;
          document.body.appendChild(touchClone);
        }
      } else {
        return;
      }
    }

    e.preventDefault(); // Prevent scrolling once drag is active

    if (touchClone) {
      touchClone.style.left = `${touch.clientX - 32}px`;
      touchClone.style.top = `${touch.clientY - 32}px`;
    }

    // Auto-scroll viewport if near top/bottom edges
    if (touch.clientY < 70) {
      window.scrollBy(0, -12);
    } else if (touch.clientY > window.innerHeight - 70) {
      window.scrollBy(0, 12);
    }

    // Highlight hovered dropzone
    const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
    document.querySelectorAll('.dropzone').forEach(dz => dz.classList.remove('drag-over'));
    const dropzone = targetEl ? targetEl.closest('.dropzone') : null;
    if (dropzone) {
      dropzone.classList.add('drag-over');
    }
  }

  function handleTouchEnd(e) {
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
    window.removeEventListener('touchcancel', handleTouchCancel);

    if (isDraggingTouch) {
      if (touchClone) {
        touchClone.remove();
        touchClone = null;
      }
      if (touchDragElement) {
        touchDragElement.classList.remove('dragging');
      }

      const touch = e.changedTouches[0];
      const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
      const dropzone = targetEl ? targetEl.closest('.dropzone') : null;

      if (dropzone && draggedItemId) {
        const targetRowId = dropzone.dataset.rowId;
        moveItemToRow(draggedItemId, targetRowId);
      }

      document.querySelectorAll('.dropzone').forEach(dz => dz.classList.remove('drag-over'));
    } else {
      // It was a tap (quick touch without dragging)
      const duration = Date.now() - touchStartTime;
      if (duration < 450 && currentTouchItem) {
        openQuickItemModal(currentTouchItem);
      }
    }

    touchDragElement = null;
    draggedItemId = null;
    currentTouchItem = null;
    isDraggingTouch = false;
  }

  function handleTouchCancel() {
    if (touchClone) {
      touchClone.remove();
      touchClone = null;
    }
    if (touchDragElement) {
      touchDragElement.classList.remove('dragging');
    }
    document.querySelectorAll('.dropzone').forEach(dz => dz.classList.remove('drag-over'));
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
    window.removeEventListener('touchcancel', handleTouchCancel);
    touchDragElement = null;
    draggedItemId = null;
    currentTouchItem = null;
    isDraggingTouch = false;
  }

  // ==========================================
  // QUICK ITEM ACTION MODAL (MOBILE / TABLET)
  // ==========================================

  const modalQuickItem = document.getElementById('modal-quick-item');
  const quickItemTitle = document.getElementById('quick-item-title');
  const quickItemThumb = document.getElementById('quick-item-thumb-preview');
  const quickItemLocation = document.getElementById('quick-item-current-location');
  const quickMoveButtons = document.getElementById('quick-move-buttons');
  const btnQuickEditItem = document.getElementById('btn-quick-edit-item');
  const btnQuickDeleteItem = document.getElementById('btn-quick-delete-item');

  function openQuickItemModal(item) {
    if (!modalQuickItem || !item) return;
    const list = getActiveList();
    if (!list) return;

    // Set title & thumbnail preview
    quickItemTitle.textContent = item.type === 'text' ? (item.text || 'Texto') : (item.label || 'Foto');
    quickItemThumb.innerHTML = '';
    if (item.type === 'image') {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.label || 'Item';
      img.onerror = () => {
        img.style.display = 'none';
        quickItemThumb.textContent = item.label || 'Sem Foto';
      };
      quickItemThumb.appendChild(img);
    } else {
      const textCard = document.createElement('div');
      textCard.className = 'quick-thumb-text';
      textCard.style.backgroundColor = item.bgColor || '#2a2d3d';
      textCard.style.color = item.textColor || '#ffffff';
      textCard.textContent = item.text || 'T';
      quickItemThumb.appendChild(textCard);
    }

    // Determine current location
    let currentRowId = 'unranked';
    let currentLabel = 'Banco de Itens';
    list.rows.forEach(r => {
      if (r.items.some(i => i.id === item.id)) {
        currentRowId = r.id;
        currentLabel = `Fileira ${r.label}`;
      }
    });
    quickItemLocation.textContent = `Local atual: ${currentLabel}`;

    // Populate quick move buttons
    quickMoveButtons.innerHTML = '';

    // Button for each row
    list.rows.forEach(row => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isCurrent = (currentRowId === row.id);
      btn.className = `btn-quick-target ${isCurrent ? 'active' : ''}`;
      btn.style.setProperty('--target-color', row.color || '#ff4757');
      btn.innerHTML = `
        <span class="target-badge" style="background:${row.color}">${row.label}</span>
        <span class="target-name">${row.label}</span>
        ${isCurrent ? '<span class="target-check">✓</span>' : ''}
      `;
      btn.onclick = () => {
        moveItemToRow(item.id, row.id);
        closeModal(modalQuickItem);
      };
      quickMoveButtons.appendChild(btn);
    });

    // Button for unranked items bank
    const btnBank = document.createElement('button');
    btnBank.type = 'button';
    const isBank = (currentRowId === 'unranked');
    btnBank.className = `btn-quick-target ${isBank ? 'active' : ''}`;
    btnBank.style.setProperty('--target-color', '#6366f1');
    btnBank.innerHTML = `
      <span class="target-badge" style="background:#4b5563">📦</span>
      <span class="target-name">Banco de Itens</span>
      ${isBank ? '<span class="target-check">✓</span>' : ''}
    `;
    btnBank.onclick = () => {
      moveItemToRow(item.id, 'unranked');
      closeModal(modalQuickItem);
    };
    quickMoveButtons.appendChild(btnBank);

    // Edit button action
    btnQuickEditItem.onclick = () => {
      closeModal(modalQuickItem);
      openEditItemModal(item);
    };

    // Delete button action
    btnQuickDeleteItem.onclick = () => {
      closeModal(modalQuickItem);
      deleteItem(item.id);
    };

    openModal(modalQuickItem);
  }

  // State item mover logic
  function moveItemToRow(itemId, targetRowId) {
    const list = getActiveList();
    let foundItem = null;

    // Remove item from wherever it currently is
    list.unrankedItems = list.unrankedItems.filter(i => {
      if (i.id === itemId) { foundItem = i; return false; }
      return true;
    });

    list.rows.forEach(r => {
      r.items = r.items.filter(i => {
        if (i.id === itemId) { foundItem = i; return false; }
        return true;
      });
    });

    if (!foundItem) return;

    // Place into target row or unranked
    if (targetRowId === 'unranked') {
      list.unrankedItems.push(foundItem);
    } else {
      const targetRow = list.rows.find(r => r.id === targetRowId);
      if (targetRow) {
        targetRow.items.push(foundItem);
        playRowSound(targetRow, list);
      } else {
        list.unrankedItems.push(foundItem);
      }
    }

    saveState();
    renderApp();
  }

  function getSoundIdForRow(row, list) {
    return row.soundId && row.soundId !== 'default' ? row.soundId : list.defaultSoundId;
  }

  function playSound(soundId) {
    const sound = SOUND_LIBRARY[soundId];
    if (!sound) return;

    if (sound.src) {
      const audio = new Audio(sound.src);
      audio.volume = 0.7;
      audio.play().catch(() => {
        // A browser can block sound when it no longer considers the drop a user gesture.
      });
      return;
    }

    playSynthSound(soundId);
  }

  function getAudioContext() {
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      audioContext = new AudioContextClass();
    }
    if (audioContext.state === 'suspended') audioContext.resume();
    return audioContext;
  }

  function playTone(context, time, frequency, duration, type = 'sine', volume = 0.08, endFrequency = frequency) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, time);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), time + duration);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(volume, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(time);
    oscillator.stop(time + duration + 0.02);
  }

  function playNoise(context, time, duration, volume = 0.05) {
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let index = 0; index < samples.length; index += 1) samples[index] = Math.random() * 2 - 1;

    const source = context.createBufferSource();
    const gain = context.createGain();
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    source.buffer = buffer;
    source.connect(gain).connect(context.destination);
    source.start(time);
  }

  function playSynthSound(soundId) {
    const context = getAudioContext();
    if (!context) return;
    const time = context.currentTime;

    switch (soundId) {
      case 'pop':
        playTone(context, time, 700, 0.13, 'sine', 0.09, 460);
        break;
      case 'achievement':
        [523, 659, 784].forEach((frequency, index) => playTone(context, time + index * 0.09, frequency, 0.16, 'triangle', 0.07));
        break;
      case 'sparkle':
        [1320, 1760, 2093].forEach((frequency, index) => playTone(context, time + index * 0.06, frequency, 0.12, 'sine', 0.045, frequency * 1.15));
        break;
      case 'impact':
        playTone(context, time, 180, 0.25, 'triangle', 0.13, 58);
        playNoise(context, time, 0.08, 0.025);
        break;
      case 'fail':
        [430, 340, 255].forEach((frequency, index) => playTone(context, time + index * 0.1, frequency, 0.15, 'sawtooth', 0.05, frequency * 0.82));
        break;
      case 'applause':
        [0, 0.07, 0.14, 0.22, 0.3].forEach(offset => playNoise(context, time + offset, 0.09, 0.05));
        break;
    }
  }

  function playRowSound(row, list = getActiveList()) {
    playSound(getSoundIdForRow(row, list));
  }

  function deleteItem(itemId) {
    const list = getActiveList();
    list.unrankedItems = list.unrankedItems.filter(i => i.id !== itemId);
    list.rows.forEach(r => {
      r.items = r.items.filter(i => i.id !== itemId);
    });
    saveState();
    renderApp();
  }

  // ==========================================
  // TIER ROWS MANAGEMENT
  // ==========================================

  function moveRow(index, direction) {
    const list = getActiveList();
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= list.rows.length) return;

    const temp = list.rows[index];
    list.rows[index] = list.rows[newIndex];
    list.rows[newIndex] = temp;

    saveState();
    renderApp();
  }

  function updateModalRowMoveButtons(rowId) {
    const list = getActiveList();
    const index = list.rows.findIndex(r => r.id === rowId);
    const btnUp = document.getElementById('btn-modal-row-up');
    const btnDown = document.getElementById('btn-modal-row-down');
    if (btnUp) btnUp.disabled = (index <= 0);
    if (btnDown) btnDown.disabled = (index >= list.rows.length - 1 || index === -1);
  }

  function openEditRowModal(row) {
    editRowId.value = row.id;
    rowLabelInput.value = row.label;
    rowCustomColor.value = row.color;
    if (rowSoundSelect) {
      rowSoundSelect.value = row.soundId || 'default';
    }

    colorDots.forEach(dot => {
      if (dot.dataset.color.toLowerCase() === row.color.toLowerCase()) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    updateModalRowMoveButtons(row.id);
    openModal(modalRow);
  }

  function addNewRow() {
    const list = getActiveList();
    const newRowId = 'row-' + Date.now();
    const presetColors = ['#ff4757', '#ffa502', '#eccc68', '#2ed573', '#1e90ff', '#9b59b6', '#ec4899'];
    const randomColor = presetColors[list.rows.length % presetColors.length];

    list.rows.push({
      id: newRowId,
      label: 'NOVO',
      color: randomColor,
      soundId: 'default',
      items: []
    });

    saveState();
    renderApp();
  }

  // ==========================================
  // ITEM CREATION & IMAGE COMPRESSION
  // ==========================================

  function findItemById(itemId) {
    const list = getActiveList();
    const unrankedItem = list.unrankedItems.find(item => item.id === itemId);
    if (unrankedItem) return unrankedItem;

    for (const row of list.rows) {
      const rowItem = row.items.find(item => item.id === itemId);
      if (rowItem) return rowItem;
    }

    return null;
  }

  function selectItemTab(tabId) {
    if (!modalItem) return;
    modalItem.querySelectorAll('.tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
    modalItem.querySelectorAll('.tab-content').forEach(content => content.classList.toggle('active', content.id === tabId));
  }

  function openNewItemModal() {
    resetItemForm();
    document.getElementById('modal-item-title').textContent = 'Adicionar Novo Item ao Tier';
    btnSaveItem.textContent = 'Adicionar Item';
    selectItemTab('tab-image');
    openModal(modalItem);
  }

  function openEditItemModal(item) {
    resetItemForm();
    editingItemId = item.id;
    document.getElementById('modal-item-title').textContent = 'Editar Item';
    btnSaveItem.textContent = 'Salvar Alterações';

    if (item.type === 'image') {
      selectItemTab('tab-image');
      itemImageUrl.value = item.src || '';
      itemImageLabel.value = item.label || '';
    } else {
      selectItemTab('tab-text');
      itemTextTitle.value = item.text || '';
      itemBgColor.value = item.bgColor || '#2a2d3d';
      itemTextColor.value = item.textColor || '#ffffff';
      textCardPreview.textContent = item.text || 'Texto de Exemplo';
      textCardPreview.style.backgroundColor = item.bgColor || '#2a2d3d';
      textCardPreview.style.color = item.textColor || '#ffffff';
    }

    openModal(modalItem);
  }

  function handleSaveItem() {
    const activeTab = modalItem ? (modalItem.querySelector('.tab-btn.active')?.dataset.tab || 'tab-image') : 'tab-image';
    const list = getActiveList();
    const itemBeingEdited = editingItemId ? findItemById(editingItemId) : null;

    if (activeTab === 'tab-image') {
      const urlValue = itemImageUrl.value.trim();
      const labelValue = itemImageLabel.value.trim();

      if (urlValue) {
        if (itemBeingEdited) {
          itemBeingEdited.type = 'image';
          itemBeingEdited.src = urlValue;
          itemBeingEdited.label = labelValue;
          delete itemBeingEdited.text;
          delete itemBeingEdited.bgColor;
          delete itemBeingEdited.textColor;
        } else {
          list.unrankedItems.push({
            id: 'item-' + Date.now(),
            type: 'image',
            src: urlValue,
            label: labelValue
          });
        }
        saveState();
        renderApp();
        closeModal(modalItem);
        resetItemForm();
      } else if (itemImageFile.files.length > 0) {
        processImageFiles(itemBeingEdited ? [itemImageFile.files[0]] : Array.from(itemImageFile.files), labelValue, itemBeingEdited);
        closeModal(modalItem);
        resetItemForm();
      } else {
        alert('Por favor, selecione uma imagem do dispositivo ou informe uma URL.');
      }
    } else if (activeTab === 'tab-text') {
      const textValue = itemTextTitle.value.trim();
      if (!textValue) {
        alert('Por favor, informe o texto do card.');
        return;
      }

      if (itemBeingEdited) {
        itemBeingEdited.type = 'text';
        itemBeingEdited.text = textValue;
        itemBeingEdited.bgColor = itemBgColor.value;
        itemBeingEdited.textColor = itemTextColor.value;
        delete itemBeingEdited.src;
        delete itemBeingEdited.label;
      } else {
        list.unrankedItems.push({
          id: 'item-' + Date.now(),
          type: 'text',
          text: textValue,
          bgColor: itemBgColor.value,
          textColor: itemTextColor.value
        });
      }
      saveState();
      renderApp();
      closeModal(modalItem);
      resetItemForm();
    }
  }

  // Process uploaded images & downscale to Base64 to save storage space
  function processImageFiles(files, customLabel, itemBeingEdited = null) {
    const list = getActiveList();
    let processed = 0;

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Downscale canvas
          const canvas = document.createElement('canvas');
          const maxDim = 450;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);

          if (itemBeingEdited) {
            itemBeingEdited.type = 'image';
            itemBeingEdited.src = compressedBase64;
            itemBeingEdited.label = customLabel || file.name.replace(/\.[^/.]+$/, "");
            delete itemBeingEdited.text;
            delete itemBeingEdited.bgColor;
            delete itemBeingEdited.textColor;
          } else {
            list.unrankedItems.push({
              id: 'item-' + Date.now() + '-' + index,
              type: 'image',
              src: compressedBase64,
              label: customLabel || file.name.replace(/\.[^/.]+$/, "")
            });
          }

          processed++;
          if (processed === files.length) {
            saveState();
            renderApp();
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function resetItemForm() {
    editingItemId = null;
    itemImageFile.value = '';
    itemImageUrl.value = '';
    itemImageLabel.value = '';
    itemTextTitle.value = '';
    textCardPreview.textContent = 'Texto de Exemplo';
    textCardPreview.style.backgroundColor = '#2a2d3d';
    textCardPreview.style.color = '#ffffff';
  }

  // ==========================================
  // BACKUP JSON IMPORT / EXPORT
  // ==========================================

  function exportBackup() {
    state.theme = state.theme || JSON.parse(JSON.stringify(DEFAULT_THEME));
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    const filename = `tiercraft-backup-${new Date().toISOString().slice(0, 10)}.json`;
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  function importBackupJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.tierLists) {
        state = parsed;
        if (parsed.theme) {
          applyTheme(parsed.theme, true);
        } else {
          // If the backup doesn't specify a theme, maintain current theme
          state.theme = state.theme || JSON.parse(JSON.stringify(DEFAULT_THEME));
          applyTheme(state.theme, false);
        }
        saveState();
        renderApp();
        showNotificationToast('📦 Backup e tema restaurados com sucesso!');
        closeModal(modalBackup);
      } else {
        alert('Arquivo JSON inválido. Estrutura incorreta.');
      }
    } catch (e) {
      alert('Erro ao processar arquivo JSON: ' + e.message);
    }
  }

  // ==========================================
  // SINGLE TIERLIST AI IMPORT & PROMPT ENGINE
  // ==========================================

  const AI_PROMPT_TEMPLATE = `Atue como um especialista e crie uma Tier List completa em formato JSON válido para o aplicativo TierCraft sobre o seguinte tema: [DIGITE SEU TEMA AQUI, EX: "Melhores Jogos de RPG de Todos os Tempos", "Melhores Animes Shonen dos Anos 2000", "Carros Esportivos Mais Marcantes", etc.].

Retorne EXCLUSIVAMENTE o código JSON puro (sem explicações antes ou depois), seguindo a estrutura abaixo:

{
  "title": "Nome da Tier List",
  "description": "Breve descrição contextualizando a classificação",
  "defaultSoundId": "swoosh",
  "rows": [
    {
      "label": "S",
      "color": "#ff4757",
      "items": [
        {
          "type": "image",
          "label": "Nome do Item 1",
          "src": "https://url-direta-da-imagem.jpg"
        },
        {
          "type": "text",
          "text": "Nome do Item 2",
          "bgColor": "#ff4757",
          "textColor": "#ffffff"
        }
      ]
    },
    {
      "label": "A",
      "color": "#ffa502",
      "items": []
    },
    {
      "label": "B",
      "color": "#eccc68",
      "items": []
    },
    {
      "label": "C",
      "color": "#2ed573",
      "items": []
    },
    {
      "label": "D",
      "color": "#1e90ff",
      "items": []
    }
  ],
  "unrankedItems": [
    {
      "type": "image",
      "label": "Item no Banco de Itens",
      "src": "https://url-direta-da-imagem.jpg"
    },
    {
      "type": "text",
      "text": "Outro Item",
      "bgColor": "#6366f1",
      "textColor": "#ffffff"
    }
  ]
}

Regras obrigatórias:
1. Você pode definir a quantidade de fileiras (rows) e os nomes mais adequados ao tema (ex: S, A, B, C, D ou "Obra-prima", "Excelente", "Bom", "Mediano", "Ruim").
2. Cores hexadecimais sugeridas para as fileiras: #ff4757, #ffa502, #eccc68, #2ed573, #1e90ff, #9b59b6, #ec4899, #718093.
3. Efeitos sonoros suportados (soundId): "swoosh", "pop", "achievement", "sparkle", "impact", "fail", "applause", "none".
4. Itens do tipo "image" devem ter "src" (URL direta acessível da web) e "label" (rótulo descritivo).
5. Itens do tipo "text" devem ter "text" com o nome, e opcionais "bgColor" e "textColor".
6. Os itens podem vir previamente distribuídos nas fileiras (em rows.items) ou agrupados em "unrankedItems" para o usuário classificar manualmente.`;

  const AI_JSON_EXAMPLE = `{
  "title": "Melhores Jogos da Década",
  "description": "Ranking dos maiores lançamentos dos videogames dos últimos 10 anos.",
  "defaultSoundId": "achievement",
  "rows": [
    {
      "label": "Obra-Prima (S)",
      "color": "#ff4757",
      "items": [
        {
          "type": "image",
          "label": "The Witcher 3",
          "src": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300"
        },
        {
          "type": "text",
          "text": "Chrono Trigger",
          "bgColor": "#ff4757",
          "textColor": "#ffffff"
        }
      ]
    },
    {
      "label": "Excelente (A)",
      "color": "#ffa502",
      "items": [
        {
          "type": "text",
          "text": "Red Dead Redemption 2",
          "bgColor": "#ffa502",
          "textColor": "#ffffff"
        }
      ]
    },
    {
      "label": "Muito Bom (B)",
      "color": "#eccc68",
      "items": []
    },
    {
      "label": "Bom (C)",
      "color": "#2ed573",
      "items": []
    }
  ],
  "unrankedItems": [
    {
      "type": "image",
      "label": "Elden Ring",
      "src": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300"
    },
    {
      "type": "text",
      "text": "Cyberpunk 2077",
      "bgColor": "#6366f1",
      "textColor": "#ffffff"
    }
  ]
}`;

  function importSingleTierListJSON(rawInput) {
    if (!rawInput || !rawInput.trim()) {
      showImportError('Por favor, cole um código JSON ou selecione um arquivo válido.');
      return false;
    }

    let cleaned = rawInput.trim();
    // Remove markdown code fences if present
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```[a-zA-Z]*\n?/, '').replace(/```\s*$/, '').trim();
    }

    let parsed = null;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      showImportError('Erro de formatação JSON: ' + err.message + '. Certifique-se de que o código copiado está completo.');
      return false;
    }

    // Normalize incoming data into a list of tier lists to append
    let listsToImport = [];

    if (parsed && typeof parsed === 'object') {
      if (parsed.tierLists && typeof parsed.tierLists === 'object') {
        // Full backup file: import all lists without wiping existing ones
        listsToImport = Object.values(parsed.tierLists);
      } else if (Array.isArray(parsed)) {
        // Array of tier lists
        listsToImport = parsed;
      } else if (parsed.tierList && typeof parsed.tierList === 'object') {
        listsToImport = [parsed.tierList];
      } else if (parsed.data && typeof parsed.data === 'object' && (parsed.data.rows || parsed.data.title)) {
        listsToImport = [parsed.data];
      } else if (parsed.title || parsed.rows || parsed.unrankedItems) {
        // Single tier list object
        listsToImport = [parsed];
      }
    }

    if (!listsToImport || listsToImport.length === 0) {
      showImportError('Estrutura não reconhecida. O JSON deve possuir ao menos os campos "title" ou "rows".');
      return false;
    }

    const presetPalette = ['#ff4757', '#ffa502', '#eccc68', '#2ed573', '#1e90ff', '#9b59b6', '#ec4899', '#718093'];
    let lastAddedId = null;
    let importedCount = 0;

    listsToImport.forEach((rawList, listIdx) => {
      if (!rawList || typeof rawList !== 'object') return;

      const newId = 'list-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
      const title = (rawList.title || rawList.name || `Nova Tier List IA ${state ? Object.keys(state.tierLists).length + 1 : 1}`).trim();
      const description = (rawList.description || rawList.desc || 'Tier List criada via inteligência artificial').trim();
      const defaultSoundId = (rawList.defaultSoundId && SOUND_LIBRARY[rawList.defaultSoundId]) ? rawList.defaultSoundId : 'swoosh';

      // Rows sanitization
      let sanitizedRows = [];
      const incomingRows = Array.isArray(rawList.rows) ? rawList.rows : [];

      if (incomingRows.length > 0) {
        sanitizedRows = incomingRows.map((r, rIdx) => {
          const rowId = (r.id ? String(r.id) : '') || ('row-' + Date.now() + '-' + rIdx + '-' + Math.random().toString(36).substr(2, 4));
          const label = String(r.label || r.name || r.title || `Tier ${rIdx + 1}`).trim();
          const color = (r.color || presetPalette[rIdx % presetPalette.length]).trim();
          const soundId = r.soundId || 'default';

          const sanitizedItems = [];
          const incomingItems = Array.isArray(r.items) ? r.items : [];
          incomingItems.forEach((it, itIdx) => {
            const itemObj = sanitizeItemObject(it, itIdx);
            if (itemObj) sanitizedItems.push(itemObj);
          });

          return {
            id: rowId,
            label: label,
            color: color,
            soundId: soundId,
            items: sanitizedItems
          };
        });
      } else {
        // Fallback to standard preset
        sanitizedRows = JSON.parse(JSON.stringify(PRESETS.standard));
      }

      // Unranked items sanitization
      const sanitizedUnranked = [];
      const incomingUnranked = Array.isArray(rawList.unrankedItems) ? rawList.unrankedItems : (Array.isArray(rawList.items) ? rawList.items : []);
      incomingUnranked.forEach((it, itIdx) => {
        const itemObj = sanitizeItemObject(it, itIdx);
        if (itemObj) sanitizedUnranked.push(itemObj);
      });

      // Append to state WITHOUT overwriting existing lists!
      state.tierLists[newId] = {
        id: newId,
        title: title,
        description: description,
        defaultSoundId: defaultSoundId,
        rows: sanitizedRows,
        unrankedItems: sanitizedUnranked
      };

      lastAddedId = newId;
      importedCount++;
    });

    if (importedCount === 0) {
      showImportError('Não foi possível identificar nenhuma Tier List válida no arquivo.');
      return false;
    }

    // Set as active tier list
    if (lastAddedId) {
      state.activeTierListId = lastAddedId;
    }

    saveState();
    renderApp();
    playSynthSound('achievement');

    const firstListTitle = state.tierLists[lastAddedId].title;
    showNotificationToast(`✨ Tier List "${firstListTitle}" importada com sucesso! (${importedCount} lista${importedCount > 1 ? 's' : ''})`);

    hideImportError();
    if (aiJsonInput) aiJsonInput.value = '';
    if (inputImportSingleJson) inputImportSingleJson.value = '';
    closeModal(modalImportAi);

    return true;
  }

  function sanitizeItemObject(it, fallbackIndex) {
    if (!it) return null;
    const itemId = (it.id ? String(it.id) : '') || ('item-' + Date.now() + '-' + fallbackIndex + '-' + Math.random().toString(36).substr(2, 6));

    if (typeof it === 'string') {
      return {
        id: itemId,
        type: 'text',
        text: it,
        bgColor: '#2a2d3d',
        textColor: '#ffffff'
      };
    }

    const type = it.type || ((it.src || it.url || it.image) ? 'image' : 'text');

    if (type === 'image') {
      const src = it.src || it.url || it.image || '';
      const label = it.label || it.name || it.title || '';
      if (!src && !label) return null;
      return {
        id: itemId,
        type: 'image',
        src: src,
        label: label
      };
    } else {
      const text = it.text || it.label || it.name || it.title || 'Item';
      return {
        id: itemId,
        type: 'text',
        text: text,
        bgColor: it.bgColor || it.bg_color || '#2a2d3d',
        textColor: it.textColor || it.text_color || '#ffffff'
      };
    }
  }

  function showImportError(msg) {
    if (importJsonError) {
      importJsonError.textContent = msg;
      importJsonError.style.display = 'block';
    } else {
      alert(msg);
    }
  }

  function hideImportError() {
    if (importJsonError) {
      importJsonError.style.display = 'none';
      importJsonError.textContent = '';
    }
  }

  function selectAiModalTab(tabId) {
    if (!modalImportAi) return;
    modalImportAi.querySelectorAll('.tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
    modalImportAi.querySelectorAll('.tab-content').forEach(content => content.classList.toggle('active', content.id === tabId));
  }

  function initAiPromptPreview() {
    if (aiPromptTemplateEl) aiPromptTemplateEl.textContent = AI_PROMPT_TEMPLATE;
    if (aiJsonExampleEl) aiJsonExampleEl.textContent = AI_JSON_EXAMPLE;
  }

  function openAiImportModal() {
    hideImportError();
    if (aiJsonInput) aiJsonInput.value = '';
    if (inputImportSingleJson) inputImportSingleJson.value = '';
    selectAiModalTab('tab-import-json');
    initAiPromptPreview();
    openModal(modalImportAi);
  }

  function fallbackCopy(text, callback) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.top = '-9999px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      if (callback) callback();
    } catch (err) {
      alert('Não foi possível copiar automaticamente. Selecione o modelo manualmente.');
    }
  }

  // ==========================================
  // EXPORT TO PNG IMAGE ENGINE (CANVAS)
  // ==========================================

  function exportTierListToPNG() {
    const list = getActiveList();
    const ctx = exportCanvas.getContext('2d');

    const boardWidth = 1000;
    const rowHeight = 110;
    const padding = 24;
    const headerHeight = 90;
    const totalHeight = headerHeight + (list.rows.length * (rowHeight + 8)) + padding * 2;

    exportCanvas.width = boardWidth;
    exportCanvas.height = totalHeight;

    // Background
    ctx.fillStyle = '#0b0d14';
    ctx.fillRect(0, 0, boardWidth, totalHeight);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Outfit, sans-serif';
    ctx.fillText(list.title || 'Tier List', padding, padding + 32);

    // Subtitle
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Plus Jakarta Sans, sans-serif';
    ctx.fillText(list.description || '', padding, padding + 54);

    let currentY = padding + headerHeight;

    // Preload image promises for canvas rendering
    const imageLoadPromises = [];

    list.rows.forEach(row => {
      row.items.forEach(item => {
        if (item.type === 'image' && item.src) {
          const p = new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve({ id: item.id, imgObj: img });
            img.onerror = () => resolve({ id: item.id, imgObj: null });
            img.src = item.src;
          });
          imageLoadPromises.push(p);
        }
      });
    });

    Promise.all(imageLoadPromises).then(loadedImages => {
      const imgMap = {};
      loadedImages.forEach(res => {
        if (res.imgObj) imgMap[res.id] = res.imgObj;
      });

      // Draw rows
      list.rows.forEach(row => {
        // Row background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(padding, currentY, boardWidth - (padding * 2), rowHeight);

        // Badge Box (Left)
        const badgeWidth = 280;
        ctx.fillStyle = row.color || '#718093';
        ctx.fillRect(padding, currentY, badgeWidth, rowHeight);

        // Label Text
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 24px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(row.label || '', padding + (badgeWidth / 2), currentY + (rowHeight / 2));

        // Reset text alignment
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        // Draw items inside row
        let itemX = padding + badgeWidth + 12;
        const itemY = currentY + 15;
        const itemSize = 80;

        row.items.forEach(item => {
          if (itemX + itemSize > boardWidth - padding) return; // Wrap limit preview

          if (item.type === 'image') {
            const imgObj = imgMap[item.id];
            if (imgObj) {
              ctx.drawImage(imgObj, itemX, itemY, itemSize, itemSize);
            } else {
              ctx.fillStyle = '#1c2232';
              ctx.fillRect(itemX, itemY, itemSize, itemSize);
            }
          } else if (item.type === 'text') {
            ctx.fillStyle = item.bgColor || '#2a2d3d';
            ctx.fillRect(itemX, itemY, itemSize, itemSize);

            ctx.fillStyle = item.textColor || '#ffffff';
            ctx.font = 'bold 12px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Simple text truncate for canvas
            let txt = item.text || '';
            if (txt.length > 10) txt = txt.substring(0, 8) + '..';

            ctx.fillText(txt, itemX + (itemSize / 2), itemY + (itemSize / 2));
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
          }

          itemX += itemSize + 8;
        });

        currentY += rowHeight + 8;
      });

      // Watermark / Brand
      ctx.fillStyle = '#64748b';
      ctx.font = '12px Outfit, sans-serif';
      ctx.fillText('Criado com TierCraft - Host no GitHub Pages', padding, totalHeight - 12);

      // Trigger Download
      const link = document.createElement('a');
      link.download = `${(list.title || 'tierlist').toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = exportCanvas.toDataURL('image/png');
      link.click();
    });
  }

  // ==========================================
  // EVENT LISTENERS & MODALS LOGIC
  // ==========================================

  function setupEventListeners() {
    // Tierlist selector
    selectTierList.addEventListener('change', (e) => {
      state.activeTierListId = e.target.value;
      saveState();
      renderApp();
    });

    // Editable Title & Desc
    tierListTitle.addEventListener('blur', () => {
      const activeList = getActiveList();
      activeList.title = tierListTitle.textContent.trim() || 'Minha Tier List';
      saveState();
      renderTierListSelector();
    });

    tierListDesc.addEventListener('blur', () => {
      const activeList = getActiveList();
      activeList.description = tierListDesc.textContent.trim();
      saveState();
    });

    // Header buttons
    btnNewTierList.addEventListener('click', () => {
      newListTitle.value = '';
      openModal(modalNewList);
    });

    btnRenameTierList.addEventListener('click', () => {
      const activeList = getActiveList();
      const newTitle = prompt('Novo nome da Tier List:', activeList.title);
      if (newTitle && newTitle.trim()) {
        activeList.title = newTitle.trim();
        saveState();
        renderApp();
      }
    });

    btnDeleteTierList.addEventListener('click', () => {
      const keys = Object.keys(state.tierLists);
      if (keys.length <= 1) {
        alert('Você precisa ter pelo menos uma Tier List.');
        return;
      }
      if (confirm(`Excluir permanentemente "${getActiveList().title}"?`)) {
        delete state.tierLists[state.activeTierListId];
        state.activeTierListId = Object.keys(state.tierLists)[0];
        saveState();
        renderApp();
      }
    });

    btnExportImage.addEventListener('click', exportTierListToPNG);
    btnBackupModal.addEventListener('click', () => openModal(modalBackup));
    if (btnFocusMode) btnFocusMode.addEventListener('click', () => toggleFocusMode(true));
    if (btnExitFocus) btnExitFocus.addEventListener('click', () => toggleFocusMode(false));

    btnResetBoard.addEventListener('click', () => {
      if (confirm('Deseja mover TODOS os itens das fileiras de volta para os não classificados?')) {
        const list = getActiveList();
        list.rows.forEach(r => {
          list.unrankedItems.push(...r.items);
          r.items = [];
        });
        saveState();
        renderApp();
      }
    });

    btnAddRow.addEventListener('click', addNewRow);
    if (btnSoundSettings && listDefaultSound && modalSoundSettings) {
      btnSoundSettings.addEventListener('click', () => {
        listDefaultSound.value = getActiveList().defaultSoundId || 'none';
        openModal(modalSoundSettings);
      });
    }
    btnOpenAddItemModal.addEventListener('click', openNewItemModal);
    searchItemsInput.addEventListener('input', () => renderUnrankedItems(getActiveList()));

    // Tabs inside Add Item Modal
    if (modalItem) {
      modalItem.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectItemTab(btn.dataset.tab);
        });
      });
    }

    // File drop area inside modal
    fileDropArea.addEventListener('click', () => itemImageFile.click());
    fileDropArea.addEventListener('dragover', (e) => { e.preventDefault(); fileDropArea.style.borderColor = '#6366f1'; });
    fileDropArea.addEventListener('dragleave', () => { fileDropArea.style.borderColor = ''; });
    fileDropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      fileDropArea.style.borderColor = '';
      if (e.dataTransfer.files.length > 0) {
        itemImageFile.files = e.dataTransfer.files;
      }
    });

    // Direct drag & drop images onto unranked bank
    unrankedItemsContainer.addEventListener('dragover', (e) => e.preventDefault());
    unrankedItemsContainer.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        e.preventDefault();
        processImageFiles(Array.from(e.dataTransfer.files), '');
      }
    });

    // Text Card Live Preview
    itemTextTitle.addEventListener('input', () => {
      textCardPreview.textContent = itemTextTitle.value.trim() || 'Texto de Exemplo';
    });
    itemBgColor.addEventListener('input', () => {
      textCardPreview.style.backgroundColor = itemBgColor.value;
    });
    itemTextColor.addEventListener('input', () => {
      textCardPreview.style.color = itemTextColor.value;
    });

    btnSaveItem.addEventListener('click', handleSaveItem);

    // Color Dots in Row Modal
    colorDots.forEach(dot => {
      dot.addEventListener('click', () => {
        colorDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        rowCustomColor.value = dot.dataset.color;
      });
    });

    btnSaveRow.addEventListener('click', () => {
      const list = getActiveList();
      const row = list.rows.find(r => r.id === editRowId.value);
      if (row) {
        row.label = rowLabelInput.value.trim() || 'TIER';
        row.color = rowCustomColor.value;
        if (rowSoundSelect) row.soundId = rowSoundSelect.value;
        saveState();
        renderApp();
        closeModal(modalRow);
      }
    });

    if (btnPreviewRowSound && rowSoundSelect) {
      btnPreviewRowSound.addEventListener('click', () => {
        const list = getActiveList();
        const soundId = rowSoundSelect.value === 'default' ? list.defaultSoundId : rowSoundSelect.value;
        playSound(soundId);
      });
    }

    if (btnPreviewDefaultSound && listDefaultSound) {
      btnPreviewDefaultSound.addEventListener('click', () => playSound(listDefaultSound.value));
    }

    if (btnSaveSoundSettings && listDefaultSound && modalSoundSettings) {
      btnSaveSoundSettings.addEventListener('click', () => {
        getActiveList().defaultSoundId = listDefaultSound.value;
        saveState();
        closeModal(modalSoundSettings);
      });
    }

    const btnModalRowUp = document.getElementById('btn-modal-row-up');
    const btnModalRowDown = document.getElementById('btn-modal-row-down');

    if (btnModalRowUp) {
      btnModalRowUp.addEventListener('click', () => {
        const list = getActiveList();
        const rowId = editRowId.value;
        const index = list.rows.findIndex(r => r.id === rowId);
        if (index > 0) {
          moveRow(index, -1);
          updateModalRowMoveButtons(rowId);
        }
      });
    }

    if (btnModalRowDown) {
      btnModalRowDown.addEventListener('click', () => {
        const list = getActiveList();
        const rowId = editRowId.value;
        const index = list.rows.findIndex(r => r.id === rowId);
        if (index >= 0 && index < list.rows.length - 1) {
          moveRow(index, 1);
          updateModalRowMoveButtons(rowId);
        }
      });
    }

    btnDeleteRow.addEventListener('click', () => {
      const list = getActiveList();
      const row = list.rows.find(r => r.id === editRowId.value);
      if (!row) return;

      if (confirm(`Excluir a fileira "${row.label}"? Os itens contidos nela retornarão para o banco de itens.`)) {
        list.unrankedItems.push(...row.items);
        list.rows = list.rows.filter(r => r.id !== editRowId.value);
        saveState();
        renderApp();
        closeModal(modalRow);
      }
    });

    // New TierList modal confirmation
    btnConfirmNewList.addEventListener('click', () => {
      const title = newListTitle.value.trim() || 'Nova Tier List';
      const presetKey = newListPreset.value;
      const newId = 'list-' + Date.now();

      const presetRows = PRESETS[presetKey] ? JSON.parse(JSON.stringify(PRESETS[presetKey])) : [];

      state.tierLists[newId] = {
        id: newId,
        title: title,
        description: 'Clique aqui para adicionar uma descrição',
        rows: presetRows,
        unrankedItems: []
      };

      state.activeTierListId = newId;
      saveState();
      renderApp();
      closeModal(modalNewList);
    });

    // Backup actions
    btnDownloadJson.addEventListener('click', exportBackup);
    inputImportJson.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => importBackupJSON(evt.target.result);
        reader.readAsText(file);
      }
    });

    btnApplyJsonText.addEventListener('click', () => {
      const txt = jsonPreview.value.trim();
      if (txt) importBackupJSON(txt);
    });

    // AI Tier List Import Actions
    if (btnHeaderAiImport) {
      btnHeaderAiImport.addEventListener('click', openAiImportModal);
    }
    if (btnImportAiList) {
      btnImportAiList.addEventListener('click', openAiImportModal);
    }
    if (btnSwitchToAiImport) {
      btnSwitchToAiImport.addEventListener('click', () => {
        closeModal(modalBackup);
        openAiImportModal();
      });
    }

    // AI Import Modal Tabs
    if (modalImportAi) {
      modalImportAi.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectAiModalTab(btn.dataset.tab);
        });
      });
    }

    // AI Import Modal Copy Prompt Button
    if (btnCopyAiPrompt) {
      btnCopyAiPrompt.addEventListener('click', () => {
        const textToCopy = AI_PROMPT_TEMPLATE;
        const copySuccess = () => {
          const copyIcon = document.getElementById('copy-btn-icon');
          const copyText = document.getElementById('copy-btn-text');
          if (copyIcon) copyIcon.textContent = '✓';
          if (copyText) copyText.textContent = 'Copiado!';
          btnCopyAiPrompt.classList.add('btn-emerald');
          showNotificationToast('📋 Prompt copiado para a área de transferência!');
          setTimeout(() => {
            if (copyIcon) copyIcon.textContent = '📋';
            if (copyText) copyText.textContent = 'Copiar Prompt';
            btnCopyAiPrompt.classList.remove('btn-emerald');
          }, 2500);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(copySuccess).catch(() => {
            fallbackCopy(textToCopy, copySuccess);
          });
        } else {
          fallbackCopy(textToCopy, copySuccess);
        }
      });
    }

    // AI Import File Upload
    if (inputImportSingleJson) {
      inputImportSingleJson.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            const content = evt.target.result;
            if (aiJsonInput) aiJsonInput.value = content;
            importSingleTierListJSON(content);
          };
          reader.onerror = () => {
            showImportError('Erro ao ler o arquivo JSON selecionado.');
          };
          reader.readAsText(file);
        }
      });
    }

    // AI Import Confirm Action
    if (btnConfirmImportSingle) {
      btnConfirmImportSingle.addEventListener('click', () => {
        const rawContent = aiJsonInput ? aiJsonInput.value : '';
        importSingleTierListJSON(rawContent);
      });
    }

    // Theme & Typography Manager Listeners
    if (btnThemeModal) {
      btnThemeModal.addEventListener('click', () => {
        updateThemeModalUI(state.theme || DEFAULT_THEME);
        openModal(modalTheme);
      });
    }

    // Theme Preset Cards
    document.querySelectorAll('.theme-card').forEach(card => {
      card.addEventListener('click', () => {
        const selectedId = card.dataset.themeId;
        const currentTheme = state.theme || JSON.parse(JSON.stringify(DEFAULT_THEME));
        currentTheme.id = selectedId;
        applyTheme(currentTheme, true);
      });
    });

    // Font selection chips
    document.querySelectorAll('.font-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const selectedFont = chip.dataset.font;
        const currentTheme = state.theme || JSON.parse(JSON.stringify(DEFAULT_THEME));
        currentTheme.font = selectedFont;
        applyTheme(currentTheme, true);
      });
    });

    // Live hex labels for custom color pickers
    if (customColorBg) {
      customColorBg.addEventListener('input', () => {
        if (hexValBg) hexValBg.textContent = customColorBg.value;
      });
    }
    if (customColorCard) {
      customColorCard.addEventListener('input', () => {
        if (hexValCard) hexValCard.textContent = customColorCard.value;
      });
    }
    if (customColorAccent) {
      customColorAccent.addEventListener('input', () => {
        if (hexValAccent) hexValAccent.textContent = customColorAccent.value;
      });
    }
    if (customColorText) {
      customColorText.addEventListener('input', () => {
        if (hexValText) hexValText.textContent = customColorText.value;
      });
    }

    // Save Custom Theme Button
    if (btnApplyCustomColors) {
      btnApplyCustomColors.addEventListener('click', () => {
        const currentTheme = state.theme || JSON.parse(JSON.stringify(DEFAULT_THEME));
        currentTheme.id = 'custom';
        currentTheme.customColors = {
          bgDark: customColorBg.value,
          bgCard: customColorCard.value,
          accentPrimary: customColorAccent.value,
          textMain: customColorText.value
        };
        applyTheme(currentTheme, true);
      });
    }

    // Reset default theme
    if (btnResetDefaultTheme) {
      btnResetDefaultTheme.addEventListener('click', () => {
        if (confirm('Restaurar o tema padrão (Escuro / Outfit)?')) {
          applyTheme(JSON.parse(JSON.stringify(DEFAULT_THEME)), true);
        }
      });
    }

    // Generic Modal Close handler
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.close;
        closeModal(document.getElementById(modalId));
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal(backdrop);
      });
    });
  }

  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    if (modalEl === modalBackup) {
      jsonPreview.value = JSON.stringify(state, null, 2);
    } else if (modalEl === modalImportAi) {
      initAiPromptPreview();
    } else if (modalEl === modalTheme) {
      updateThemeModalUI(state.theme || DEFAULT_THEME);
    }
  }

  function closeModal(modalEl) {
    modalEl.classList.remove('active');
  }

  // Focus / Presentation Mode Elements
  const btnFocusMode = document.getElementById('btn-focus-mode');
  const btnExitFocus = document.getElementById('btn-exit-focus');
  const focusExitToast = document.getElementById('focus-exit-toast');
  let focusToastTimer = null;

  function toggleFocusMode(enable) {
    const isFocus = enable !== undefined ? enable : !document.body.classList.contains('focus-mode');
    if (isFocus) {
      document.body.classList.add('focus-mode');
      if (focusExitToast) {
        focusExitToast.classList.add('toast-show');
        if (focusToastTimer) clearTimeout(focusToastTimer);
        focusToastTimer = setTimeout(() => {
          focusExitToast.classList.remove('toast-show');
        }, 2800);
      }
    } else {
      document.body.classList.remove('focus-mode');
      if (focusExitToast) {
        focusExitToast.classList.remove('toast-show');
      }
      if (focusToastTimer) clearTimeout(focusToastTimer);
    }
  }

  // Keyboard shortcut listener (F for Focus Mode, T for Theme, ESC to Exit)
  document.addEventListener('keydown', (e) => {
    // Ignore hotkeys if user is currently typing in input, textarea, or contenteditable
    const activeEl = document.activeElement;
    const isTyping = activeEl && (
      activeEl.tagName === 'INPUT' ||
      activeEl.tagName === 'TEXTAREA' ||
      activeEl.isContentEditable
    );

    if (isTyping) return;

    if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFocusMode();
    } else if (e.key === 't' || e.key === 'T') {
      e.preventDefault();
      updateThemeModalUI(state.theme || DEFAULT_THEME);
      openModal(modalTheme);
    } else if (e.key === 'Escape') {
      if (document.body.classList.contains('focus-mode')) {
        e.preventDefault();
        toggleFocusMode(false);
      }
    }
  });

  // Start application
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
