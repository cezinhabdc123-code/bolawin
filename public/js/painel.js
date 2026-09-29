// ─── Painel Page — mobile-first redesign ──────────────────────────────────────
function renderPainel(el) {
  const user    = API.getUser() || {};
  const inicial = (user.nome || 'U').charAt(0).toUpperCase();

  el.innerHTML = `
    <div class="pnl-root">

      <!-- ══ HEADER ══════════════════════════════════════════════════════ -->
      <header class="pnl-header">
        <div class="pnl-header-inner">
          <div class="pnl-logo brand-logo-wrap" style="cursor:pointer;" onclick="navigate('#landing')">
            <img class="brand-logo-img" src="" alt="logo" style="display:none;height:32px;object-fit:contain"/>
            <div class="pnl-logo-icon brand-logo-icon">🌀</div>
            <span class="brand-name">BolaWin</span>
          </div>
          <div class="pnl-header-right">
            <!-- Botão de depósito rápido no header -->
            <button class="pnl-header-dep-btn" id="header-btn-depositar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              <span>DEPOSITAR</span>
            </button>
            <!-- Saldo chip com dropdown -->
            <div class="pnl-saldo-wrap" id="saldo-chip-wrap">
              <div class="pnl-saldo-chip" id="saldo-chip">
                <div class="pnl-saldo-chip-inner">
                  <span class="pnl-saldo-chip-lbl">Saldo</span>
                  <span class="pnl-saldo-chip-val" id="saldo-badge">...</span>
                </div>
                <svg class="saldo-chip-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="10" height="10"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <div class="pnl-saldo-drop hidden" id="saldo-drop">
                <div class="psd-arrow"></div>
                <button class="psd-item" id="psd-btn-depositar">
                  <span class="psd-icon psd-icon-green">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                  </span>
                  <div class="psd-text">
                    <span class="psd-label">Depositar</span>
                    <span class="psd-sub">Adicionar saldo via PIX</span>
                  </div>
                </button>
                <div class="psd-divider"></div>
                <button class="psd-item" id="psd-btn-sacar">
                  <span class="psd-icon psd-icon-red">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                  </span>
                  <div class="psd-text">
                    <span class="psd-label">Sacar</span>
                    <span class="psd-sub">Retirar seu saldo</span>
                  </div>
                </button>
              </div>
            </div>
            <div class="pnl-avatar-wrap">
              <div class="pnl-avatar" id="btn-perfil" title="${user.nome || ''}">${inicial}</div>
              <!-- Dropdown do perfil -->
              <div class="pnl-profile-drop hidden" id="profile-drop">
                <div class="ppd-arrow"></div>
                <div class="ppd-header">
                  <div class="ppd-avatar">${inicial}</div>
                  <div>
                    <div class="ppd-name" id="ppd-nome">${user.nome || 'Usuário'}</div>
                    <div class="ppd-email" id="ppd-email">${user.email || ''}</div>
                  </div>
                </div>
                <div class="ppd-divider"></div>
                <button class="ppd-item" id="ppd-btn-perfil">
                  <span class="ppd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></span>
                  <span>Meu Perfil</span>
                </button>
                <button class="ppd-item" id="ppd-btn-indique">
                  <span class="ppd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>
                  <span>Indique & Ganhe</span>
                  <span class="ppd-badge" id="ppd-saldo-afil">R$ 0,00</span>
                </button>
                <button class="ppd-item" id="ppd-btn-suporte">
                  <span class="ppd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
                  <span>Suporte</span>
                </button>
                ${user.role === 'admin' ? `
                <div class="ppd-divider"></div>
                <button class="ppd-item" onclick="window.location.href='/admin'" style="color:var(--neon-cyan)">
                  <span class="ppd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></span>
                  <span class="ppd-label" style="font-weight:800; color: #00E5FF">Painel Diretoria</span>
                </button>
                ` : ''}
                <div class="ppd-divider"></div>
                <button class="ppd-item ppd-item-danger" id="ppd-btn-sair">
                  <span class="ppd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span>
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- ══ SCROLL AREA ══════════════════════════════════════════════════ -->
      <div class="pnl-scroll">

        <!-- Botões ocultos mantidos para compatibilidade com JS -->
        <button id="btn-depositar" style="display:none"></button>
        <button id="btn-sacar" style="display:none"></button>
        <button id="btn-indicar" style="display:none"></button>
        <span id="st-saldo" style="display:none"></span>
        <!-- ── Banner slider ─────────────────────────────────────────── -->
        <div id="pnl-banner-wrap" style="display:none;margin:14px auto 0;padding:0 12px;box-sizing:border-box;position:relative">
          <div id="pnl-banner-track" style="display:flex;transition:transform .4s cubic-bezier(.4,0,.2,1);border-radius:14px;overflow:hidden">
          </div>
          <!-- dots -->
          <div id="pnl-banner-dots" style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);display:flex;gap:6px;z-index:2"></div>
          <!-- arrows -->
          <button id="pnl-banner-prev" style="position:absolute;left:8px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.45);border:none;border-radius:50%;width:30px;height:30px;color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;backdrop-filter:blur(4px)">‹</button>
          <button id="pnl-banner-next" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.45);border:none;border-radius:50%;width:30px;height:30px;color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;backdrop-filter:blur(4px)">›</button>
        </div>

        <!-- ── Dicas rotativas ───────────────────────────────────────── -->
        <div class="pnl-tips-wrap" id="pnl-tips-wrap">
          <div class="pnl-tips-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div class="pnl-tips-text" id="pnl-tips-text"></div>
        </div>

        <!-- ── Game card ─────────────────────────────────────────────── -->
        <div class="pnl-game-card">

          <!-- Topo do card -->
          <div class="pnl-game-top">
            <div>
              <div class="pnl-game-title">INICIAR PARTIDA</div>
              <div class="pnl-game-sub">Passe plataformas, acumule dinheiro e escolha quando resgatar!</div>
            </div>
            <div class="pnl-game-badge" id="users-playing-badge">
              <span class="badge-dot"></span>
              <span class="badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </span>
              <span id="n-jogando">0</span>
              <span class="badge-label">online</span>
            </div>
          </div>

          <!-- Chips informativos -->
          <div class="pnl-chips">
            <div class="pnl-chip pnl-chip-gold" id="chip-mult">
              <span class="chip-icon">🎯</span>
              <span>Meta = <strong id="chip-mult-val">...×</strong></span>
            </div>
            <div class="pnl-chip pnl-chip-blue">
              <span class="chip-icon">∞</span>
              <span>Plataformas</span>
            </div>
          </div>

          <!-- Seção de aposta centralizada -->
          <div class="pnl-bet-center">

            <div class="pnl-quick-label">Valor de entrada</div>
            <div class="pnl-quick-row" id="quick-amounts">
              <button class="pnl-quick" data-v="1">R$1</button>
              <button class="pnl-quick" data-v="2">R$2</button>
              <button class="pnl-quick" data-v="5">R$5</button>
              <button class="pnl-quick" data-v="10">R$10</button>
              <button class="pnl-quick" data-v="20">R$20</button>
              <button class="pnl-quick" data-v="50">R$50</button>
            </div>
            <!-- valores dinâmicos sobrescrevem os acima via JS -->

            <div class="pnl-input-wrap">
              <span class="pnl-input-prefix">R$</span>
              <input id="entrada-val" class="pnl-input" type="number"
                placeholder="0,00" min="1" max="100" step="0.01" inputmode="decimal" />
            </div>

            <div class="pnl-meta-row" id="meta-preview">
              <div class="pnl-meta-item">
                <div class="pnl-meta-lbl">Meta de ganho</div>
                <div class="pnl-meta-val pnl-meta-gold" id="meta-val">R$ 0,00</div>
              </div>
              <div class="pnl-meta-item">
                <div class="pnl-meta-lbl">Por plataforma</div>
                <div class="pnl-meta-val" id="meta-vpp">R$ 0,10</div>
              </div>
              <div class="pnl-meta-item">
                <div class="pnl-meta-lbl">Plat. p/ meta</div>
                <div class="pnl-meta-val" id="meta-plat">~70</div>
              </div>
            </div>

          </div>

          <!-- Alerta saldo -->
          <div id="saldo-warn" class="pnl-warn hidden">
            ⚠️ Saldo insuficiente
            <button class="pnl-warn-btn" id="dep-from-warn">Depositar agora</button>
          </div>

          <!-- Botão jogar -->
          <button class="pnl-play-btn" id="btn-jogar">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><polygon points="5,3 19,12 5,21"/></svg>
            JOGAR AGORA
          </button>
        </div>

        <div style="height:80px"></div>
      </div><!-- /scroll -->

      <!-- ══ BOTTOM NAV ══════════════════════════════════════════════════ -->
      <nav class="pnl-bottom-nav">
        <button class="pnl-nav-item pnl-nav-active" id="nav-jogar" onclick="document.getElementById('btn-jogar')?.scrollIntoView({behavior:'smooth',block:'center'})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
          <span>Jogar</span>
        </button>
        <button class="pnl-nav-item" id="nav-dep">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          <span>Depositar</span>
        </button>
        <button class="pnl-nav-item" id="nav-sac">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          <span>Sacar</span>
        </button>
        <button class="pnl-nav-item" id="nav-ind">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>Indicar</span>
        </button>
        <button class="pnl-nav-item" id="nav-sair">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
          <span>Sair</span>
        </button>
      </nav>

    </div><!-- /pnl-root -->

    <!-- ══ MODAIS ══════════════════════════════════════════════════════════ -->

    <!-- Modal Depositar -->
    <div class="pnl-modal-bg hidden" id="modal-deposito">
      <div class="pnl-modal">
        <div class="pnl-modal-header">
          <span class="pnl-modal-title">Depositar via PIX</span>
          <button class="pnl-modal-close" id="close-deposito">✕</button>
        </div>
        <div id="dep-step1">
          <div class="dep-amount-grid" id="dep-quick-row" style="margin-bottom:14px">
            <button class="pnl-quick" data-dep="10">R$10</button>
            <button class="pnl-quick" data-dep="20">R$20</button>
            <button class="pnl-quick" data-dep="50">R$50</button>
            <button class="pnl-quick" data-dep="100">R$100</button>
          </div>
          <div class="pnl-input-wrap" style="margin-bottom:16px">
            <span class="pnl-input-prefix">R$</span>
            <input id="dep-valor" class="pnl-input" type="number" placeholder="Mínimo R$10,00" min="10" step="1" inputmode="decimal" data-min="10" data-max="0" />
          </div>
          <!-- Card de bônus — só aparece quando bônus está ativo -->
          <div id="dep-bonus-card" class="hidden" style="background:linear-gradient(135deg,#1a7a3a,#22a850);border-radius:12px;padding:14px 16px;margin-bottom:16px;color:#fff">
            <div style="font-size:11px;font-weight:700;letter-spacing:.08em;opacity:.85;margin-bottom:6px" id="dep-bonus-label">BÔNUS DE 0%</div>
            <div style="font-size:22px;font-weight:800;margin-bottom:8px" id="dep-bonus-valor">+ R$ 0,00</div>
            <div style="border-top:1px solid rgba(255,255,255,.25);padding-top:8px;font-size:13px;opacity:.9">
              💰 Total na conta: <strong id="dep-bonus-total">R$ 0,00</strong>
            </div>
          </div>
          <!-- Cupom discreto -->
          <div id="dep-cupom-wrap" style="margin-bottom:14px">
            <div id="dep-cupom-toggle" style="display:flex;align-items:center;gap:6px;cursor:pointer;width:fit-content;opacity:.6;font-size:12px;color:var(--pnl-muted,#52796f)" onclick="toggleDepCupom()">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              Tenho um cupom
            </div>
            <div id="dep-cupom-field" style="display:none;margin-top:8px">
              <div style="display:flex;gap:8px;align-items:center">
                <input id="dep-cupom-input" class="pnl-input" type="text" placeholder="Código do cupom" style="flex:1;text-transform:uppercase;background:transparent" oninput="this.value=this.value.toUpperCase().replace(/\s/g,'')" />
                <button id="dep-cupom-btn" style="flex-shrink:0;background:#2d6a4f;color:#fff;border:none;border-radius:8px;padding:9px 14px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap" onclick="aplicarCupomDep()">Aplicar</button>
              </div>
              <div id="dep-cupom-status" style="margin-top:6px;font-size:12px;min-height:18px;display:flex;align-items:center;flex-wrap:wrap;gap:8px">
              </div>
              <div id="dep-cupom-alterar-wrap" style="display:none;margin-top:6px">
                <button onclick="alterarCupomDep()" style="display:inline-flex;align-items:center;gap:5px;background:none;border:1px solid #d1d5db;border-radius:6px;padding:5px 10px;font-size:11px;font-weight:600;color:#6b7280;cursor:pointer;transition:all .15s">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Alterar cupom
                </button>
              </div>
            </div>
          </div>
          <button class="pnl-play-btn" id="dep-confirmar">Gerar QR Code PIX</button>
        </div>
        <div id="dep-step2" class="hidden" style="text-align:center">
          <!-- Loading enquanto aguarda resposta do gateway -->
          <div id="dep-loading" style="padding:40px 0">
            <div style="width:48px;height:48px;border:4px solid #d0f5e8;border-top-color:#2d6a4f;border-radius:50%;animation:spin .8s linear infinite;margin:0 auto 16px"></div>
            <div style="font-size:13px;color:#52796f">Gerando cobrança PIX...</div>
          </div>
          <!-- Conteúdo após retorno do gateway -->
          <div id="dep-content" class="hidden">
            <div id="dep-qr-wrap" style="background:linear-gradient(135deg,#e8fff4,#d0f5e8);border-radius:12px;padding:16px;margin-bottom:16px">
              <div id="dep-qr-canvas" style="width:180px;height:180px;display:flex;align-items:center;justify-content:center;margin:0 auto"></div>
              <img id="dep-qr-img" src="" alt="QR PIX" style="width:180px;height:180px;border-radius:8px;display:none;margin:0 auto" />
            </div>
            <div style="margin-bottom:14px">
              <div style="font-size:11px;color:#52796f;margin-bottom:6px;font-weight:600;text-transform:uppercase;letter-spacing:.05em">Código Copia e Cola</div>
              <div style="display:flex;align-items:center;gap:8px;background:#f1fdf7;border:1px solid #b7e4c7;border-radius:10px;padding:10px 12px">
                <div id="dep-pix-txt" style="flex:1;font-size:11px;color:#1b4332;text-align:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis"></div>
                <button id="dep-copy-btn"
                  style="flex-shrink:0;background:#2d6a4f;color:#fff;border:none;border-radius:7px;padding:7px 12px;font-size:12px;font-weight:600;cursor:pointer">Copiar</button>
              </div>
            </div>
            <div class="pnl-info-box pnl-info-green">✅ Após o pagamento seu saldo é creditado automaticamente em até 1 minuto.</div>
            <div class="pnl-timer" id="dep-timer"></div>
          </div>
          <button class="pnl-btn-outline" onclick="document.getElementById('modal-deposito').classList.add('hidden')" style="margin-top:12px">Fechar</button>
        </div>
      </div>
    </div>

    <!-- Modal Depósito Confirmado -->
    <div class="pnl-modal-bg hidden" id="modal-dep-confirmado">
      <div class="pnl-modal" style="text-align:center;max-width:360px">
        <div style="margin:0 auto 16px;width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#16a34a);display:flex;align-items:center;justify-content:center;animation:depConfirmPop .5s cubic-bezier(.34,1.56,.64,1) both">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" width="36" height="36"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style="font-size:20px;font-weight:800;color:#22c55e;margin-bottom:6px">Depósito Confirmado!</div>
        <div style="font-size:13px;color:rgba(255,255,255,.6);margin-bottom:18px">Seu pagamento foi recebido com sucesso.</div>
        <div style="background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);border-radius:12px;padding:14px;margin-bottom:20px">
          <div style="font-size:11px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">Valor creditado</div>
          <div id="dep-confirmado-valor" style="font-size:28px;font-weight:800;color:#22c55e">R$ 0,00</div>
          <div style="font-size:12px;color:rgba(255,255,255,.5);margin-top:6px">Novo saldo: <strong id="dep-confirmado-saldo" style="color:#fff">R$ 0,00</strong></div>
        </div>
        <button class="pnl-play-btn" onclick="document.getElementById('modal-dep-confirmado').classList.add('hidden')" style="width:100%">Jogar Agora 🎮</button>
      </div>
    </div>

    <!-- Modal Saque -->
    <div class="pnl-modal-bg hidden" id="modal-saque">
      <div class="pnl-modal">
        <div class="pnl-modal-header">
          <span class="pnl-modal-title">Solicitar Saque</span>
          <button class="pnl-modal-close" id="close-saque">✕</button>
        </div>
        <div class="pnl-saldo-modal-info">Saldo disponível: <strong id="saldo-saque-disp">...</strong></div>
        <div class="pnl-input-wrap" style="margin-bottom:14px">
          <span class="pnl-input-prefix">R$</span>
          <input id="saq-valor" class="pnl-input" type="number" placeholder="Mínimo R$20,00" min="20" step="0.01" inputmode="decimal" data-min="20" data-max="0" />
        </div>
        <div class="pnl-input-wrap" style="margin-bottom:14px;background:#f8f8f8">
          <span class="pnl-input-prefix" style="font-size:11px;white-space:nowrap">PIX</span>
          <input id="saq-pix" class="pnl-input" type="text" placeholder="Chave PIX" style="background:transparent" />
        </div>
        <div class="pnl-input-wrap" style="margin-bottom:14px;background:#f8f8f8">
          <span class="pnl-input-prefix" style="font-size:11px;white-space:nowrap">CPF</span>
          <input id="saq-cpf" class="pnl-input" type="text" placeholder="CPF do titular" maxlength="14" inputmode="numeric" style="background:transparent" />
        </div>
        <div class="pnl-info-box pnl-info-orange">⏱ Saques processados em até 24h úteis.</div>
        <button class="pnl-play-btn" id="saq-confirmar" style="margin-top:16px;background:linear-gradient(135deg,var(--pnl-pink,#FF6B9D),var(--pnl-pink-light,#FF8CC8))">Solicitar Saque</button>

        <!-- Meus Saques -->
        <div id="meus-saques-section" style="display:none;margin-top:22px">
          <div style="font-size:13px;font-weight:700;color:#9980aa;margin-bottom:10px;display:flex;align-items:center;gap:6px">
            <span>📋</span> Meus Saques
          </div>
          <div id="meus-saques-lista"></div>
        </div>
      </div>
    </div>

    <!-- ══ MODAL SAQUE AFILIADO ════════════════════════════════════════════ -->
    <div class="pnl-modal-bg hidden" id="modal-saque-afiliado">
      <div class="pnl-modal">
        <div class="pnl-modal-header">
          <span class="pnl-modal-title">Sacar Comissão</span>
          <button class="pnl-modal-close" id="close-saque-afiliado">✕</button>
        </div>
        <div class="pnl-saldo-modal-info">Saldo de comissão: <strong id="saldo-afil-disp">...</strong></div>
        <div class="pnl-input-wrap" style="margin-bottom:14px">
          <span class="pnl-input-prefix">R$</span>
          <input id="saq-afil-valor" class="pnl-input" type="number" placeholder="Mínimo R$1,00" min="1" step="0.01" inputmode="decimal" />
        </div>
        <div class="pnl-input-wrap" style="margin-bottom:14px;background:#f8f8f8">
          <span class="pnl-input-prefix" style="font-size:11px;white-space:nowrap">PIX</span>
          <input id="saq-afil-pix" class="pnl-input" type="text" placeholder="CPF, e-mail, telefone..." style="background:transparent" />
        </div>
        <div class="pnl-info-box pnl-info-orange">⏱ Saques processados em até 24h úteis.</div>
        <button class="pnl-play-btn" id="saq-afil-confirmar" style="margin-top:16px;background:linear-gradient(135deg,var(--pnl-purple,#7c3aed),var(--pnl-purple2,#a855f7))">Solicitar Saque de Comissão</button>
      </div>
    </div>

    <!-- Modal Indicação -->
    <!-- ══ MODAL SUPORTE ══════════════════════════════════════════════════ -->
    <div class="pnl-modal-bg hidden" id="modal-suporte">
      <div class="pnl-modal">
        <div class="pnl-modal-header">
          <span class="pnl-modal-title">Suporte</span>
          <button class="pnl-modal-close" id="close-suporte">✕</button>
        </div>
        <div id="suporte-loading" style="text-align:center;padding:30px 0;color:#9980aa;font-size:14px">Carregando...</div>
        <div id="suporte-links-wrap"></div>
      </div>
    </div>

    <!-- ══ MODAL PERFIL ═══════════════════════════════════════════════════ -->
    <div class="pnl-modal-bg hidden" id="modal-perfil">
      <div class="pnl-modal">
        <div class="pnl-modal-header">
          <span class="pnl-modal-title">Meu Perfil</span>
          <button class="pnl-modal-close" id="close-perfil">✕</button>
        </div>

        <!-- Avatar e nome -->
        <div style="display:flex;flex-direction:column;align-items:center;padding:10px 0 20px;gap:8px">
          <div class="prf-avatar-lg" id="prf-avatar-lg">${inicial}</div>
          <div style="font-size:18px;font-weight:800;color:#2d0040" id="prf-nome">${user.nome || ''}</div>
          <div style="font-size:12px;color:#9980aa" id="prf-email">${user.email || ''}</div>
        </div>

        <!-- Stats do perfil -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:20px">
          <div class="prf-stat">
            <div class="prf-stat-val" id="prf-saldo">R$ 0,00</div>
            <div class="prf-stat-lbl">Saldo</div>
          </div>
          <div class="prf-stat">
            <div class="prf-stat-val" id="prf-partidas">0</div>
            <div class="prf-stat-lbl">Partidas</div>
          </div>
          <div class="prf-stat">
            <div class="prf-stat-val" id="prf-afil">R$ 0,00</div>
            <div class="prf-stat-lbl">Afiliado</div>
          </div>
        </div>

        <!-- Alterar senha -->
        <div class="prf-section">
          <div class="prf-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Alterar Senha
          </div>
          <input class="pnl-input-modal" id="prf-senha-atual" type="password" placeholder="Senha atual"/>
          <input class="pnl-input-modal" id="prf-senha-nova" type="password" placeholder="Nova senha"/>
          <input class="pnl-input-modal" id="prf-senha-conf" type="password" placeholder="Confirmar nova senha"/>
          <button class="prf-btn-salvar" id="prf-btn-senha">Alterar Senha</button>
        </div>
      </div>
    </div>

    <div class="pnl-modal-bg hidden" id="modal-indicacao">
      <div class="pnl-modal">
        <div class="pnl-modal-header">
          <span class="pnl-modal-title">Indicar Amigos</span>
          <button class="pnl-modal-close" id="close-indicacao">✕</button>
        </div>
        <div class="pnl-info-box pnl-info-pink" style="text-align:center;margin-bottom:16px">
          🎉 Ganhe <strong id="ind-comissao-perc">...</strong> de comissão para cada amigo que fizer o primeiro depósito!
        </div>

        <!-- Saldo Afiliado destaque -->
        <div id="ind-saldo-box" style="background:linear-gradient(135deg,#4a1080,#2d0a50);border-radius:14px;padding:18px 20px;margin-bottom:14px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px">
            <div>
              <div style="font-size:11px;color:#ffffff;text-transform:uppercase;letter-spacing:.6px;margin-bottom:4px">Saldo de Afiliado</div>
              <div id="ind-saldo-afil" style="font-size:24px;font-weight:700;color:#fff">R$ 0,00</div>
              <div style="font-size:11px;color:#9d74c5;margin-top:2px">disponível para saque</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:11px;color:#ffffff;text-transform:uppercase;letter-spacing:.6px;margin-bottom:4px">Total Recebido</div>
              <div id="ind-total-comissao" style="font-size:18px;font-weight:600;color:#e9d5ff">R$ 0,00</div>
              <div style="font-size:11px;color:#9d74c5;margin-top:2px">em comissões</div>
            </div>
          </div>
          <button id="btn-sacar-afil" style="width:100%;padding:12px;border-radius:10px;border:none;cursor:pointer;background:linear-gradient(135deg,#00c97a,#00c97a);color:#fff;font-weight:700;font-size:14px;display:flex;align-items:center;justify-content:center;gap:8px;transition:opacity .2s">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            Sacar Comissão
          </button>
        </div>

        <div class="pnl-link-box">
          <div class="pnl-link-label">Seu link exclusivo</div>
          <div class="pnl-link-val" id="ind-link">...</div>
          <button class="pnl-btn-copy" onclick="copyToClipboard(document.getElementById('ind-link').textContent)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Copiar
          </button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
          <div class="pnl-mini-stat">
            <div class="pnl-mini-val" id="ind-total">0</div>
            <div class="pnl-mini-lbl">Indicados</div>
          </div>
          <div class="pnl-mini-stat">
            <div class="pnl-mini-val" id="ind-bonus">R$ 0,00</div>
            <div class="pnl-mini-lbl">Com depósito</div>
          </div>
        </div>

        <!-- CARD MONTANTE -->
        <div id="ind-card-montante" style="display:none;background:linear-gradient(135deg,#ff6b9d,#ff6b9d);border-radius:14px;padding:18px 20px;margin-bottom:16px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
            
            <div style="flex:1">
              <div style="font-size:11px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:#ffffff;margin-bottom:2px">MONTANTE</div>
              <div style="font-size:11px;color:#ffffff">Volume total de depósitos</div>
            </div>
            <div style="display:flex;align-items:center;gap:4px;color:#00C97A;font-size:13px;font-weight:700">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              <span id="ind-montante-perc">0%</span>
            </div>
          </div>
          <div id="ind-montante" style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-.5px">R$ 0,00</div>
        </div>

        <div id="ind-lista"></div>
      </div>
    </div>

    <style>
      /* ── Root & layout ─────────────────────────────────────────── */
      .pnl-root {
        display: flex; flex-direction: column; height: 100vh;
        font-family: 'Poppins', system-ui, sans-serif;
        overflow: hidden;
        position: relative;
        background-color: #0d0020;
      }
      /* Imagem real do jogo cobrindo todo o painel */
      .pnl-root::before {
        content: '';
        position: absolute; inset: 0; z-index: 0;
        background: url('/img/game-bg.png') center center / cover no-repeat;
        opacity: 0.28;
        pointer-events: none;
      }
      /* Overlay escuro sobre a imagem para manter legibilidade */
      .pnl-root::after {
        content: '';
        position: absolute; inset: 0; z-index: 0;
        background: linear-gradient(160deg, rgba(13,0,32,0.58) 0%, rgba(30,0,66,0.52) 50%, rgba(13,0,32,0.62) 100%);
        pointer-events: none;
      }
      :root { --pnl-pink:#FF6B9D; --pnl-pink-light:#FF8CC8; --pnl-purple:#9333EA; --pnl-purple2:#a855f7; --pnl-green:#00C97A; --pnl-red:#FF4D6D; }
      /* Todo conteúdo acima dos pseudo-elementos */
      .pnl-header, .pnl-scroll, .pnl-bottom-nav {
        position: relative; z-index: 1;
      }

      /* ── Header ────────────────────────────────────────────────── */
      .pnl-header {
        background: rgba(13,0,32,0.85); border-bottom: 1px solid rgba(255,255,255,.07);
        padding: 0 16px; flex-shrink: 0; position: sticky; top: 0; z-index: 100;
        box-shadow: 0 2px 20px rgba(0,0,0,.3); backdrop-filter: blur(12px);
      }
      .pnl-header-inner {
        display: flex; align-items: center; justify-content: space-between;
        height: 56px;
      }
      .pnl-logo { display: flex; align-items: center; gap: 8px; }
      .pnl-logo-icon { font-size: 22px; }
      .pnl-logo span { font-size: 18px; font-weight: 800; color: var(--pnl-pink,#FF6B9D); }
      .pnl-header-inner { color: #fff; }
      .pnl-header-right { display: flex; align-items: center; gap: 8px; }
      .pnl-header-dep-btn {
        display: flex; align-items: center; gap: 6px;
        background: #00C97A; color: #fff; border: none;
        padding: 8px 14px; border-radius: 50px;
        font-size: 11px; font-weight: 800; cursor: pointer;
        transition: all .2s; letter-spacing: .3px;
        box-shadow: 0 4px 12px rgba(0,201,122,.3);
      }
      .pnl-header-dep-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
      .pnl-header-dep-btn:active { transform: scale(.96); }
      @media (max-width: 360px) {
        .pnl-header-dep-btn span { display: none; }
        .pnl-header-dep-btn { padding: 8px; border-radius: 50%; }
      }
      .pnl-saldo-wrap { position: relative; }
      .pnl-saldo-chip {
        display: flex; flex-direction: row; align-items: center; gap: 6px;
        background: linear-gradient(135deg,#00C97A,#00a864);
        border-radius: 20px; padding: 5px 12px; cursor: pointer;
        transition: filter .15s, transform .15s;
        user-select: none;
      }
      .pnl-saldo-chip:hover { filter: brightness(1.08); transform: translateY(-1px); }
      .pnl-saldo-chip:active { transform: scale(.97); }
      .pnl-saldo-chip-inner { display: flex; flex-direction: column; align-items: flex-end; }
      .pnl-saldo-chip-lbl { font-size: 9px; color: rgba(255,255,255,.8); text-transform: uppercase; letter-spacing: .5px; line-height: 1; }
      .pnl-saldo-chip-val { font-size: 14px; font-weight: 800; color: #fff; line-height: 1.3; }
      .saldo-chip-caret { color: rgba(255,255,255,.75); flex-shrink: 0; transition: transform .2s; }
      .pnl-saldo-chip.open .saldo-chip-caret { transform: rotate(180deg); }

      /* ── Saldo Dropdown ─────────────────────────────────────────── */
      .pnl-saldo-drop {
        position: absolute; top: calc(100% + 10px); right: 0;
        width: 210px;
        background: #1a0035;
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 14px;
        box-shadow: 0 20px 60px rgba(0,0,0,.65), 0 0 0 1px rgba(0,201,122,.12);
        z-index: 9999;
        animation: dropIn .18s ease both;
      }
      .psd-arrow {
        position: absolute; top: -7px; right: 18px;
        width: 13px; height: 13px;
        background: #1a0035; border-left: 1px solid rgba(255,255,255,.12);
        border-top: 1px solid rgba(255,255,255,.12);
        transform: rotate(45deg); border-radius: 2px;
      }
      .psd-item {
        display: flex; align-items: center; gap: 12px;
        width: 100%; padding: 12px 14px;
        background: none; border: none; color: #fff;
        font-size: 13px; font-family: inherit; cursor: pointer;
        text-align: left; transition: background .15s;
        border-radius: 14px;
      }
      .psd-item:hover { background: rgba(255,255,255,.07); }
      .psd-item:first-of-type { border-radius: 14px 14px 0 0; }
      .psd-item:last-of-type  { border-radius: 0 0 14px 14px; }
      .psd-icon {
        width: 32px; height: 32px; border-radius: 10px;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .psd-icon-green { background: rgba(0,201,122,.18); color: #00C97A; }
      .psd-icon-red   { background: rgba(239,68,68,.18);  color: #f87171; }
      .psd-text { display: flex; flex-direction: column; gap: 1px; }
      .psd-label { font-weight: 700; font-size: 13px; color: #fff; }
      .psd-sub   { font-size: 11px; color: rgba(255,255,255,.45); }
      .psd-divider { height: 1px; background: rgba(255,255,255,.07); margin: 0 10px; }
      .pnl-avatar {
        width: 36px; height: 36px; border-radius: 50%;
        background: linear-gradient(135deg,var(--pnl-pink,#FF6B9D),var(--pnl-purple,#9333EA));
        color: #fff; font-weight: 800; font-size: 15px;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; flex-shrink: 0;
        transition: transform .15s, box-shadow .15s;
      }
      .pnl-avatar:hover { transform: scale(1.08); box-shadow: 0 0 0 3px rgba(var(--pnl-pink-rgb,255,107,157),.35); }
      .pnl-avatar-wrap { position: relative; }

      /* ── Profile Dropdown ──────────────────────────────────────── */
      .pnl-profile-drop {
        position: absolute; top: calc(100% + 10px); right: 0;
        width: 240px;
        background: #1a0035;
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(255,107,157,.1);
        z-index: 9999;
        overflow: hidden;
        animation: dropIn .2s cubic-bezier(.34,1.56,.64,1);
      }
      @keyframes dropIn {
        from { opacity: 0; transform: translateY(-8px) scale(.95); }
        to   { opacity: 1; transform: translateY(0)    scale(1); }
      }
      .ppd-arrow {
        position: absolute; top: -6px; right: 14px;
        width: 12px; height: 12px; background: #1a0035;
        border-left: 1px solid rgba(255,255,255,.12);
        border-top:  1px solid rgba(255,255,255,.12);
        transform: rotate(45deg);
      }
      .ppd-header {
        display: flex; align-items: center; gap: 10px;
        padding: 14px 16px 12px;
      }
      .ppd-avatar {
        width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
        background: linear-gradient(135deg,var(--pnl-pink,#FF6B9D),var(--pnl-purple,#9333EA));
        color: #fff; font-weight: 800; font-size: 15px;
        display: flex; align-items: center; justify-content: center;
      }
      .ppd-name  { font-size: 13px; font-weight: 700; color: #fff; }
      .ppd-email { font-size: 11px; color: rgba(255,255,255,.45); margin-top: 1px; }
      .ppd-divider { height: 1px; background: rgba(255,255,255,.08); margin: 2px 0; }
      .ppd-item {
        display: flex; align-items: center; gap: 10px;
        width: 100%; padding: 11px 16px; background: transparent;
        border: none; color: rgba(255,255,255,.82); font-size: 13px;
        font-weight: 500; cursor: pointer; font-family: inherit;
        transition: background .15s, color .15s; text-align: left;
      }
      .ppd-item:hover { background: rgba(255,255,255,.07); color: #fff; }
      .ppd-icon { display: flex; align-items: center; opacity: .7; flex-shrink: 0; }
      .ppd-item:hover .ppd-icon { opacity: 1; }
      .ppd-badge {
        margin-left: auto; font-size: 10px; font-weight: 700;
        background: rgba(0,201,122,.18); color: #00e887;
        border: 1px solid rgba(0,201,122,.3); border-radius: 20px;
        padding: 2px 7px; white-space: nowrap;
      }
      .ppd-item-danger { color: rgba(255,100,100,.8); }
      .ppd-item-danger:hover { background: rgba(255,80,80,.08); color: #ff6464; }
      .ppd-item-danger .ppd-icon { opacity: .7; }

      /* ── Modal Perfil ──────────────────────────────────────────── */
      .prf-avatar-lg {
        width: 72px; height: 72px; border-radius: 50%;
        background: linear-gradient(135deg,var(--pnl-pink,#FF6B9D),var(--pnl-purple,#9333EA));
        color: #fff; font-weight: 800; font-size: 28px;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 20px rgba(147,51,234,.35), 0 0 0 4px rgba(255,107,157,.15);
      }
      .prf-stat {
        background: #f5f0ff; border: 1px solid #e8d5ff;
        border-radius: 12px; padding: 12px 8px; text-align: center;
      }
      .prf-stat-val { font-size: 14px; font-weight: 800; color: #4A0020; }
      .prf-stat-lbl { font-size: 10px; color: #9980aa; text-transform: uppercase; letter-spacing: .4px; margin-top: 3px; }
      .prf-section { margin-bottom: 12px; }
      .prf-section-title {
        display: flex; align-items: center; gap: 6px;
        font-size: 11px; font-weight: 700; color: #9980aa;
        text-transform: uppercase; letter-spacing: .5px; margin-bottom: 10px;
      }
      .pnl-input-modal {
        width: 100%; background: #f5f0ff; border: 1px solid #e0d0f0;
        border-radius: 10px; color: #2d0040; font-size: 14px; padding: 11px 14px;
        font-family: inherit; outline: none; box-sizing: border-box; margin-bottom: 8px;
        transition: border-color .15s;
      }
      .pnl-input-modal:focus { border-color: #ffffff; box-shadow: 0 0 0 3px rgba(192,132,252,.12); }
      .pnl-input-modal::placeholder { color: #c4a8d4; }
      .prf-btn-salvar {
        width: 100%; margin-top: 4px;
        background: linear-gradient(135deg,var(--pnl-purple,#9333EA),var(--pnl-pink,#FF6B9D));
        border: none; border-radius: 12px; color: #fff;
        font-size: 14px; font-weight: 700; padding: 13px;
        cursor: pointer; font-family: inherit;
        transition: opacity .15s, transform .15s;
      }
      .prf-btn-salvar:hover { opacity: .92; transform: translateY(-1px); }
      .prf-btn-salvar:disabled { opacity: .5; cursor: not-allowed; transform: none; }

      /* ── Modal Suporte ─────────────────────────────────────────── */
      .sup-link-item {
        display: flex; align-items: center; gap: 12px;
        padding: 13px 16px; border-radius: 14px;
        background: #f5f0ff; border: 1px solid #e8d5ff;
        margin-bottom: 10px; cursor: pointer;
        text-decoration: none; color: inherit;
        transition: background .15s, transform .12s, box-shadow .15s;
      }
      .sup-link-item:hover {
        background: #ede4ff; transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(147,51,234,.12);
      }
      .sup-link-icon {
        width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
        background: linear-gradient(135deg,var(--pnl-purple,#9333EA),var(--pnl-pink,#FF6B9D));
        display: flex; align-items: center; justify-content: center;
        color: #fff;
      }
      .sup-link-name { font-size: 14px; font-weight: 700; color: #2d0040; }
      .sup-link-url  { font-size: 11px; color: #9980aa; margin-top: 2px; }
      .sup-link-arrow { margin-left: auto; color: #c4a8d4; flex-shrink: 0; }
      .sup-empty { text-align:center; padding: 30px 0; color: #9980aa; font-size: 13px; }

      /* ── Scroll area ───────────────────────────────────────────── */
      .pnl-scroll { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding-bottom: 70px; background: transparent; }

      /* ── Hero ──────────────────────────────────────────────────── */
      .pnl-hero {
        background: linear-gradient(135deg,rgba(74,0,32,0.62) 0%,rgba(123,31,162,0.55) 60%,rgba(255,107,157,0.45) 100%);
        padding: 28px 20px 24px; text-align: center; position: relative;
        overflow: hidden;
      }
      .pnl-hero::before {
        content: ''; position: absolute; inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
      .pnl-hero-label {
        font-size: 11px; color: rgba(255,255,255,.65); text-transform: uppercase;
        letter-spacing: 1px; margin-bottom: 4px; position: relative;
      }
      .pnl-hero-value {
        font-size: 42px; font-weight: 800; color: #fff; line-height: 1.1;
        margin-bottom: 20px; position: relative;
        text-shadow: 0 2px 12px rgba(0,0,0,.2);
      }
      .pnl-hero-actions { display: flex; gap: 10px; justify-content: center; position: relative; flex-wrap: wrap; }
      .pnl-action-btn {
        display: flex; align-items: center; gap: 6px; padding: 10px 18px;
        border-radius: 50px; font-size: 13px; font-weight: 700; cursor: pointer;
        border: none; font-family: inherit; transition: all .2s;
      }
      .pnl-action-btn svg { width: 15px; height: 15px; flex-shrink: 0; }
      .pnl-action-green { background: #00C97A; color: #fff; box-shadow: 0 4px 14px rgba(0,201,122,.4); }
      .pnl-action-green:hover { filter: brightness(1.1); transform: translateY(-1px); }
      .pnl-action-outline { background: rgba(255,255,255,.15); color: #fff; border: 1px solid rgba(255,255,255,.3); }
      .pnl-action-outline:hover { background: rgba(255,255,255,.25); }

      /* ── Dicas rotativas ────────────────────────────────────────── */
      /* ── Banner responsivo ──────────────────────────────────────── */
      #pnl-banner-wrap {
        width: 100%;
        box-sizing: border-box;
      }
      #pnl-banner-wrap img {
        width: 100%;
        height: auto;
        display: block;
      }
      /* Desktop: limita largura e centraliza tudo no mesmo eixo */
      @media (min-width: 600px) {
        #pnl-banner-wrap,
        .pnl-tips-wrap,
        .pnl-game-card {
          max-width: 860px;
          margin-left: auto !important;
          margin-right: auto !important;
          box-sizing: border-box;
        }
        #pnl-banner-wrap {
          padding: 0 12px;
        }
        .pnl-tips-wrap {
          width: calc(100% - 24px);
        }
        .pnl-game-card {
          width: calc(100% - 24px);
        }
      }

      .pnl-tips-wrap {
        display: flex; align-items: center; gap: 12px;
        margin: 18px 14px 16px;
        padding: 14px 18px;
        background: linear-gradient(135deg, rgba(255,255,255,.07) 0%, rgba(255,255,255,.03) 100%);
        border: 1px solid rgba(255,255,255,.13);
        border-left: 3px solid var(--green, #00c97a);
        border-radius: 14px;
        box-shadow: 0 4px 20px rgba(0,0,0,.18);
        min-height: 48px;
        overflow: hidden;
      }
      .pnl-tips-icon {
        flex-shrink: 0;
        color: var(--green, #00c97a);
        opacity: .9;
        display: flex; align-items: center;
      }
      .pnl-tips-text {
        font-size: 13px;
        font-weight: 500;
        color: rgba(255,255,255,.82);
        line-height: 1.5;
        letter-spacing: .15px;
        flex: 1;
        opacity: 1;
        transition: opacity .45s ease;
      }
      .pnl-tips-text.fade-out { opacity: 0; }

      /* ── Game card ─────────────────────────────────────────────── */
      .pnl-game-card {
        background: linear-gradient(160deg, rgba(74,0,32,0.92) 0%, rgba(45,0,64,0.95) 100%);
        margin: 0 12px 16px; border-radius: 24px; padding: 22px 20px 20px;
        box-shadow: 0 12px 48px rgba(0,0,0,.5), 0 0 0 1px rgba(255,107,157,.15);
        position: relative; overflow: hidden;
      }
      .pnl-game-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; gap: 8px; }
      .pnl-game-title { font-size: 18px; font-weight: 800; color: #fff; letter-spacing: .5px; }
      .pnl-game-sub { font-size: 12px; color: rgba(255,255,255,.55); margin-top: 3px; line-height: 1.4; }
      @keyframes badgePulse {
        0%   { box-shadow: 0 0 0 0 rgba(0,201,122,.55); }
        70%  { box-shadow: 0 0 0 7px rgba(0,201,122,0); }
        100% { box-shadow: 0 0 0 0 rgba(0,201,122,0); }
      }
      @keyframes dotPing {
        0%, 100% { transform: scale(1); opacity: 1; }
        50%       { transform: scale(1.5); opacity: .5; }
      }
      @keyframes countUp {
        from { transform: translateY(6px); opacity: 0; }
        to   { transform: translateY(0);   opacity: 1; }
      }
      .pnl-game-badge {
        display: flex; align-items: center; gap: 5px; flex-shrink: 0;
        background: linear-gradient(135deg, rgba(0,201,122,.18) 0%, rgba(0,160,90,.12) 100%);
        border: 1px solid rgba(0,201,122,.35);
        border-radius: 20px; padding: 5px 11px;
        font-size: 11px; font-weight: 700;
        color: #00e887; white-space: nowrap;
        animation: badgePulse 2.4s ease-out infinite;
      }
      .badge-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: #00e887;
        animation: dotPing 2s ease-in-out infinite;
        flex-shrink: 0;
      }
      .badge-icon { display: flex; align-items: center; opacity: .75; }
      .badge-label { color: rgba(255,255,255,.55); font-weight: 500; }
      #n-jogando { animation: countUp .4s ease; }
      /* Seção centralizada de aposta */
      .pnl-bet-center {
        display: flex; flex-direction: column; align-items: center;
        padding: 16px 0 4px;
        border-top: 1px solid rgba(255,255,255,.08);
        margin-top: 4px;
      }
      .pnl-bet-center .pnl-quick-label { text-align: center; }
      .pnl-bet-center .pnl-quick-row { justify-content: center; }
      .pnl-bet-center .pnl-input-wrap {
        max-width: 260px; width: 100%;
        font-size: 22px;
        background: rgba(255,255,255,.08) !important;
      }
      .pnl-bet-center .pnl-input { font-size: 26px; text-align: center; }
      .pnl-bet-center .pnl-meta-row { width: 100%; }

      /* ── Chips ─────────────────────────────────────────────────── */
      .pnl-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
      .pnl-chip {
        display: flex; align-items: center; gap: 6px;
        font-size: 12px; font-weight: 700; padding: 7px 14px;
        border-radius: 50px; white-space: nowrap; letter-spacing: .2px;
        box-shadow: 0 2px 10px rgba(0,0,0,.25);
        transition: transform .15s, box-shadow .15s;
      }
      .pnl-chip:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,.35); }
      .chip-icon { font-size: 13px; line-height: 1; }
      .pnl-chip-gold  {
        background: linear-gradient(135deg, rgba(255,193,7,.22) 0%, rgba(255,152,0,.16) 100%);
        color: #FFD600; border: 1px solid rgba(255,215,0,.32);
      }
      .pnl-chip-blue  {
        background: linear-gradient(135deg, rgba(77,158,255,.22) 0%, rgba(120,90,255,.16) 100%);
        color: #a5c8ff; border: 1px solid rgba(130,180,255,.32);
      }
      .pnl-chip-green { background: rgba(0,201,122,.15); color: #00e887; border: 1px solid rgba(0,201,122,.25); }

      /* ── Quick amounts ─────────────────────────────────────────── */
      .pnl-quick-label { font-size: 11px; color: rgba(255,255,255,.5); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 8px; }
      .pnl-quick-row { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 14px; }
      /* Grid 3 colunas para botões de depósito */
      .dep-amount-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 14px; }
      .pnl-quick {
        position: relative;
        padding: 10px 8px 8px; border-radius: 12px; font-size: 14px; font-weight: 700;
        background: rgba(255,255,255,.08); color: rgba(255,255,255,.75);
        border: 1px solid rgba(255,255,255,.15); cursor: pointer; font-family: inherit;
        transition: background .1s, border-color .1s, color .1s; display: inline-flex; flex-direction: column;
        align-items: center; line-height: 1.2;
        touch-action: manipulation; -webkit-tap-highlight-color: transparent; user-select: none;
      }
      .pnl-quick:hover, .pnl-quick.active {
        background: var(--pnl-pink,#FF6B9D); color: #fff; border-color: var(--pnl-pink,#FF6B9D);
      }
      .dep-quick-badge {
        font-size: 9px; font-weight: 800; color: #22c55e; letter-spacing: .2px;
        line-height: 1; margin-top: 1px;
      }
      .pnl-quick.active .dep-quick-badge { color: #fff; }
      /* Labels de preset (QUERIDO, +CHANCES etc.) */
      .dep-preset-label {
        position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
        font-size: 8px; font-weight: 800; letter-spacing: .4px; text-transform: uppercase;
        padding: 2px 7px; border-radius: 20px; white-space: nowrap; pointer-events: none;
      }
      .dep-preset-label.lbl-destaque { background: #7c3aed; color: #fff; }
      .dep-preset-label.lbl-bonus    { background: #00e87a; color: #000; }
      .dep-preset-label.lbl-popular  { background: #fbbf24; color: #000; }
      .dep-preset-label.lbl-vip      { background: #ff4d6d; color: #fff; }
      .dep-preset-label.lbl-custom   { background: rgba(255,255,255,.2); color: #fff; }
      .dep-amount-grid .pnl-quick { padding-top: 10px; }
      .dep-amount-grid .pnl-quick:has(.dep-preset-label) { padding-top: 18px; }
      /* Quick amounts dentro de modal (fundo branco) */
      .pnl-modal .pnl-quick {
        background: #f5f0ff; color: #4A0020; border-color: #e0d0f0;
      }
      .pnl-modal .pnl-quick:hover, .pnl-modal .pnl-quick.active {
        background: var(--pnl-pink,#FF6B9D); color: #fff; border-color: var(--pnl-pink,#FF6B9D);
      }

      /* ── Input ─────────────────────────────────────────────────── */
      .pnl-input-wrap {
        display: flex; align-items: center; gap: 8px;
        background: rgba(255,255,255,.08); border: 1.5px solid rgba(255,255,255,.15);
        border-radius: 14px; padding: 0 14px; margin-bottom: 14px;
        transition: border-color .2s;
      }
      .pnl-input-wrap:focus-within { border-color: var(--pnl-pink,#FF6B9D); }
      .pnl-input-prefix { font-size: 28px; font-weight: 700; color: rgba(255,255,255,.5); flex-shrink: 0; }
      .pnl-input {
        ; background: transparent; border: none; outline: none;
        color: #fff; font-size: 20px; font-weight: 700; font-family: inherit;
        padding: 14px 0;
        color-scheme: dark;
      }
      .pnl-input::placeholder { color: rgba(255,255,255,.25); }
      .pnl-input:-webkit-autofill,
      .pnl-input:-webkit-autofill:hover,
      .pnl-input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        -webkit-text-fill-color: #fff !important;
        box-shadow: 0 0 0px 1000px transparent inset !important;
        background-color: transparent !important;
        transition: background-color 5000s ease-in-out 0s;
      }

      /* ── Meta preview ──────────────────────────────────────────── */
      .pnl-meta-row {
        display: grid; grid-template-columns: repeat(3,1fr);
        background: rgba(255,255,255,.06); border-radius: 12px;
        padding: 12px; margin-bottom: 14px; gap: 8px;
      }
      .pnl-meta-item { text-align: center; }
      .pnl-meta-lbl { font-size: 10px; color: rgba(255,255,255,.45); text-transform: uppercase; letter-spacing: .4px; margin-bottom: 3px; }
      .pnl-meta-val { font-size: 14px; font-weight: 800; color: #fff; }
      .pnl-meta-gold { color: #FFD700; }

      /* ── Warn ──────────────────────────────────────────────────── */
      .pnl-warn {
        background: rgba(255,77,109,.15); border: 1px solid rgba(255,77,109,.3);
        border-radius: 10px; padding: 10px 14px; font-size: 13px; font-weight: 700;
        color: #ff8099; display: flex; align-items: center; justify-content: space-between;
        gap: 8px; margin-bottom: 12px;
      }
      .pnl-warn-btn {
        background: #FF4D6D; color: #fff; border: none; border-radius: 20px;
        padding: 5px 12px; font-size: 11px; font-weight: 700; cursor: pointer;
        font-family: inherit; white-space: nowrap;
      }

      /* ── Play button ───────────────────────────────────────────── */
      .pnl-play-btn {
        width: 100%; padding: 16px; border-radius: 50px; border: none;
        background: linear-gradient(135deg,#00C97A,#00a864);
        color: #fff; font-size: 16px; font-weight: 800; cursor: pointer;
        font-family: inherit; display: flex; align-items: center; justify-content: center;
        gap: 10px; box-shadow: 0 6px 24px rgba(0,201,122,.4);
        transition: all .2s; letter-spacing: .5px;
      }
      .pnl-play-btn:hover:not(:disabled) { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,201,122,.5); }
      .pnl-play-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }

      /* ── Card genérico ─────────────────────────────────────────── */
      .pnl-card {
        background: #fff; margin: 0 16px 12px; border-radius: 16px;
        overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.06);
      }
      .pnl-card-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 14px 16px; border-bottom: 1px solid #f0e8ff;
      }
      .pnl-card-title { font-size: 14px; font-weight: 700; color: #2d0040; }
      .pnl-card-action { background: none; border: none; cursor: pointer; color: var(--pnl-pink,#FF6B9D); font-size: 13px; font-weight: 600; font-family: inherit; }
      .pnl-loading { text-align: center; padding: 24px; color: #9980aa; font-size: 14px; }

      /* ── Transações ────────────────────────────────────────────── */
      .pnl-tx-list { display: flex; flex-direction: column; }
      .pnl-tx-item {
        display: flex; align-items: center; gap: 12px;
        padding: 12px 16px; border-bottom: 1px solid #faf5ff; transition: background .15s;
      }
      .pnl-tx-item:last-child { border-bottom: none; }
      .pnl-tx-item:active { background: #faf5ff; }
      .pnl-tx-ico {
        width: 38px; height: 38px; border-radius: 12px; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center; font-size: 17px;
      }
      .pnl-tx-ico-win    { background: #e6fff4; }
      .pnl-tx-ico-loss   { background: #fff0f3; }
      .pnl-tx-ico-dep    { background: #e8f4ff; }
      .pnl-tx-ico-saq    { background: #fff8e6; }
      .pnl-tx-ico-bonus  { background: #ffedf4; }
      .pnl-tx-body { flex: 1; min-width: 0; }
      .pnl-tx-desc { font-size: 13px; font-weight: 600; color: #2d0040; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .pnl-tx-date { font-size: 11px; color: #9980aa; margin-top: 1px; }
      .pnl-tx-right { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; flex-shrink: 0; }
      .pnl-tx-val { font-size: 14px; font-weight: 800; }
      .pnl-tx-pos { color: #00C97A; }
      .pnl-tx-neg { color: #FF4D6D; }
      .pnl-badge {
        font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px;
      }
      .pnl-badge-green  { background: #e6fff4; color: #00C97A; }
      .pnl-badge-orange { background: #fff8e6; color: #FF8C42; }
      .pnl-badge-red    { background: #fff0f3; color: #FF4D6D; }

      /* ── Bottom nav ────────────────────────────────────────────── */
      .pnl-bottom-nav {
        position: fixed; bottom: 0; left: 0; right: 0;
        min-height: 40px;
        padding-bottom: max(env(safe-area-inset-bottom), 10px);
        background: rgba(13,0,32,0.92);
        border-top: 1px solid rgba(255,255,255,.08);
        display: flex; align-items: stretch; z-index: 200;
        box-shadow: 0 -4px 24px rgba(0,0,0,.4);
        backdrop-filter: blur(12px);
      }
      .pnl-nav-item {
        flex: 1; display: flex; flex-direction: column; align-items: center;
        justify-content: center; gap: 1px; background: none; border: none;
        cursor: pointer; color: rgba(255,255,255,.3); font-size: 8px; font-weight: 600;
        font-family: inherit; transition: color .2s; padding: 4px 0 2px;
      }
      .pnl-nav-item svg { width: 16px; height: 16px; stroke: currentColor; }
      .pnl-nav-item:hover { color: var(--pnl-pink,#FF6B9D); }
      .pnl-nav-active { color: var(--pnl-pink,#FF6B9D) !important; }
      .pnl-nav-item:last-child { color: rgba(255,128,153,.6); }

      /* ── Modais ────────────────────────────────────────────────── */
      .pnl-modal-bg {
        position: fixed; inset: 0; z-index: 500;
        background: rgba(0,0,0,.55); display: flex;
        align-items: flex-end; backdrop-filter: blur(4px);
      }
      .pnl-modal-bg.hidden { display: none; }
      .pnl-modal {
        background: #fff; width: 100%; border-radius: 24px 24px 0 0;
        padding: 20px 20px 40px; max-height: 90vh; overflow-y: auto;
        animation: slideUp .28s ease;
      }
      @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      /* Modal de confirmação de depósito — centralizado */
      #modal-dep-confirmado {
        align-items: center; justify-content: center; padding: 20px;
      }
      #modal-dep-confirmado .pnl-modal {
        border-radius: 24px; width: auto; max-width: 360px;
        padding: 32px 28px 28px; animation: popIn .35s cubic-bezier(.34,1.56,.64,1) both;
      }
      .pnl-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
      .pnl-modal-title { font-size: 17px; font-weight: 800; color: #2d0040; }
      .pnl-modal-close {
        width: 32px; height: 32px; border-radius: 50%; background: #f5f0ff;
        border: none; cursor: pointer; font-size: 14px; color: #9980aa;
        display: flex; align-items: center; justify-content: center;
      }
      .pnl-modal .pnl-input-wrap { background: #f5f0ff; border-color: #e0d0f0; }
      .pnl-modal .pnl-input-prefix { color: #9980aa; }
      .pnl-modal .pnl-input { color: #2d0040; }
      .pnl-modal .pnl-input::placeholder { color: #c4a8d4; }

      /* ── Copy box ──────────────────────────────────────────────── */
      .pnl-copy-box {
        background: #f5f0ff; border-radius: 8px; padding: 10px;
        font-size: 11px; font-family: monospace; color: #4A0020;
        word-break: break-all; cursor: pointer; line-height: 1.4;
      }
      .pnl-copy-box:active { background: #e8d8ff; }

      /* ── Info boxes ────────────────────────────────────────────── */
      .pnl-info-box { border-radius: 10px; padding: 12px 14px; font-size: 13px; line-height: 1.5; }
      .pnl-info-green  { background: #e6fff4; color: #2d6a4f; }
      .pnl-info-orange { background: #fff8e6; color: #c85c00; }
      .pnl-info-pink   { background: #ffedf4; color: #c2185b; }

      /* ── Timer ─────────────────────────────────────────────────── */
      .pnl-timer { font-size: 12px; color: #FF4D6D; font-weight: 700; text-align: center; margin-top: 8px; }

      /* ── Link box ──────────────────────────────────────────────── */
      .pnl-link-box {
        background: linear-gradient(135deg, rgb(255, 107, 157), rgb(255, 107, 157));
        border-radius: 14px; padding: 16px; margin-bottom: 16px; position: relative;
      }
      .pnl-link-label { font-size: 11px; color: rgba(255,255,255,.6); margin-bottom: 4px; }
      .pnl-link-val { font-size: 13px; color: #fff; font-weight: 600; word-break: break-all; margin-bottom: 12px; }
      .pnl-btn-copy {
        display: flex; align-items: center; gap: 6px;
        background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.25);
        color: #fff; border-radius: 20px; padding: 8px 16px; font-size: 12px;
        font-weight: 700; cursor: pointer; font-family: inherit;
      }
      .pnl-btn-copy:active { background: rgba(255,255,255,.25); }

      /* ── Mini stats (indicação) ────────────────────────────────── */
      .pnl-mini-stat {
        background: #f5f0ff; border-radius: 12px; padding: 14px;
        text-align: center;
      }
      .pnl-mini-val { font-size: 18px; font-weight: 800; color: #4A0020; margin-bottom: 2px; }
      .pnl-mini-lbl { font-size: 11px; color: #9980aa; text-transform: uppercase; letter-spacing: .4px; }

      /* ── Saldo info modal ──────────────────────────────────────── */
      .pnl-saldo-modal-info {
        font-size: 13px; color: #9980aa; background: #f5f0ff;
        border-radius: 10px; padding: 10px 14px; margin-bottom: 14px;
      }
      .pnl-saldo-modal-info strong { color: #00C97A; font-size: 15px; }

      /* ── Botão outline ─────────────────────────────────────────── */
      .pnl-btn-outline {
        width: 100%; padding: 13px; border-radius: 50px; border: 2px solid #e0d0f0;
        background: transparent; color: #9980aa; font-size: 14px; font-weight: 700;
        cursor: pointer; font-family: inherit;
      }

      /* ── Spin loader ───────────────────────────────────────────── */
      @keyframes spin { to { transform: rotate(360deg); } }
      .spin-icon { animation: spin .7s linear infinite; }
      @keyframes depConfirmPop {
        0%   { transform: scale(0); opacity: 0; }
        80%  { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); }
      }

      /* ── Utilitários ───────────────────────────────────────────── */
      .hidden { display: none !important; }
    </style>
  `;

  let currentSaldo    = 0;
  let taxaGlobal      = 0.10;
  let multGlobal      = 7;

  // ── Carregar configs do jogo (multiplicador, taxa por plataforma) ────────
  async function loadGameConfigs() {
    try {
      // Carrega config pública para checar demo_mode e manutencao
      const pubCfg = await fetch('/api/public/config?_=' + Date.now()).then(r => r.json()).catch(() => ({}));

      // Nome da plataforma
      if (pubCfg.site_nome) {
        document.querySelectorAll('.brand-name').forEach(el => el.textContent = pubCfg.site_nome);
        document.title = pubCfg.site_nome + ' - Painel';
      }

      // Banner gerenciado pelo initBanners()

      // Modo manutenção
      if (pubCfg.manutencao === true) {
        if (typeof showManutencao === 'function') showManutencao(pubCfg.site_nome || 'BolaWin', '');
        API.clearToken();
        navigate('#login');
        return;
      }

      // Modo Demo desabilitado → esconde botão demo no painel
      const demoWrap = document.querySelector('.demo-btn-wrap,[data-demo-toggle]');
      if (demoWrap) demoWrap.style.display = pubCfg.demo_mode === false ? 'none' : '';

      const cfg = await API.gameConfigs();
      taxaGlobal = parseFloat(cfg.taxa_por_plataforma) || taxaGlobal;
      multGlobal = parseFloat(cfg.multiplicador)       || multGlobal;

      // Atualiza chips informativos
      const chipMultVal = document.getElementById('chip-mult-val');
      if (chipMultVal) chipMultVal.textContent = `${multGlobal}×`;

      // Reconstrói botões de entrada com valores do admin
      const entRow = document.getElementById('quick-amounts');
      if (entRow && cfg.entrada_valores_rapidos && cfg.entrada_valores_rapidos.length) {
        entRow.innerHTML = cfg.entrada_valores_rapidos.map(v => {
          const label = Number.isInteger(v) ? `R$${v}` : `R$${v.toFixed(2).replace('.', ',')}`;
          return `<button class="pnl-quick" data-v="${v}">${label}</button>`;
        }).join('');
        // Re-bind eventos
        entRow.querySelectorAll('[data-v]').forEach(btn => {
          const applyVal = () => {
            entradaEl.value = btn.dataset.v;
            entRow.querySelectorAll('[data-v]').forEach(x => x.classList.remove('active'));
            btn.classList.add('active');
            updateMetaPreview();
          };
          btn.addEventListener('touchstart', (e) => { e.preventDefault(); applyVal(); }, { passive: false });
          btn.addEventListener('click', applyVal);
        });
      }

      // Atualiza o preview com o valor atual digitado
      updateMetaPreview();
    } catch { /* usa valores padrão */ }
  }

  // ── Carregar dashboard ───────────────────────────────────────────────────
  async function loadDashboard() {
    try {
      const data = await API.dashboard();
      currentSaldo = parseFloat(data.saldo) || 0;

      document.getElementById('saldo-badge').textContent  = formatMoney(currentSaldo);
      document.getElementById('st-saldo').textContent     = formatMoney(currentSaldo);
      document.getElementById('saldo-saque-disp').textContent = formatMoney(currentSaldo);

      checkSaldo();
    } catch (err) {
      showToast('Erro ao carregar dados.', 'error');
    }
  }

  async function loadHistorico() {
    try {
      const data = await API.historico(1, 8);
      renderTransacoes(data.transacoes || []);
    } catch {}
  }

  function renderTransacoes(list) {
    const wrap = document.getElementById('tx-list-wrap');
    if (!list.length) {
      wrap.innerHTML = '<div class="pnl-loading">Nenhuma transação ainda. Comece jogando! 🎮</div>';
      return;
    }
    const ico   = { ganho_partida:'🏆', perda_partida:'💸', deposito:'💳', saque:'⬆️', bonus_indicacao:'🎁', ajuste_admin:'⚙️' };
    const lbl   = { ganho_partida:'Resgate', perda_partida:'Derrota', deposito:'Depósito', saque:'Saque', bonus_indicacao:'Bônus indicação', ajuste_admin:'Ajuste admin' };
    const icoC  = { ganho_partida:'win', perda_partida:'loss', deposito:'dep', saque:'saq', bonus_indicacao:'bonus', ajuste_admin:'dep' };
    const isPos = { ganho_partida:true, deposito:true, bonus_indicacao:true };

    wrap.innerHTML = `<div class="pnl-tx-list">${list.map(tx => `
      <div class="pnl-tx-item">
        <div class="pnl-tx-ico pnl-tx-ico-${icoC[tx.tipo]||'dep'}">${ico[tx.tipo]||'💰'}</div>
        <div class="pnl-tx-body">
          <div class="pnl-tx-desc">${lbl[tx.tipo]||tx.tipo}</div>
          <div class="pnl-tx-date">${formatDate(tx.created_at)}</div>
        </div>
        <div class="pnl-tx-right">
          <div class="pnl-tx-val ${isPos[tx.tipo]?'pnl-tx-pos':'pnl-tx-neg'}">
            ${isPos[tx.tipo]?'+':'-'}${formatMoney(tx.valor)}
          </div>
          <span class="pnl-badge pnl-badge-${tx.status==='aprovado'?'green':tx.status==='pendente'?'orange':'red'}">
            ${tx.status}
          </span>
        </div>
      </div>`).join('')}</div>`;
  }

  // ── Input de valor ───────────────────────────────────────────────────────
  const entradaEl = document.getElementById('entrada-val');

  function updateMetaPreview() {
    const v    = parseFloat(entradaEl.value) || 0;
    const meta = v * multGlobal;
    // valor por plataforma = taxa × aposta (proporcional à aposta)
    const vpp  = v * taxaGlobal;
    const plat = vpp > 0 ? Math.ceil(meta / vpp) : '—';
    document.getElementById('meta-val').textContent  = formatMoney(meta);
    document.getElementById('meta-vpp').textContent  = vpp > 0 ? formatMoney(vpp) : '—';
    document.getElementById('meta-plat').textContent = plat !== '—' ? '~' + plat : '—';

    checkSaldo();
  }

  function checkSaldo() {
    const v = parseFloat(entradaEl.value) || 0;
    const insuf = v > currentSaldo && v > 0;
    document.getElementById('saldo-warn').classList.toggle('hidden', !insuf);
    document.getElementById('btn-jogar').disabled = insuf || v < 1;
  }

  entradaEl.addEventListener('input', () => {
    const v = parseFloat(entradaEl.value) || 0;
    updateMetaPreview();
    $$('.pnl-quick[data-v]').forEach(b => b.classList.toggle('active', parseFloat(b.dataset.v) === v));
  });

  $$('.pnl-quick[data-v]').forEach(btn => {
    const applyQuick = () => {
      entradaEl.value = btn.dataset.v;
      entradaEl.dispatchEvent(new Event('input'));
    };
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); applyQuick(); }, { passive: false });
    btn.addEventListener('click', applyQuick);
  });

  document.getElementById('dep-from-warn').addEventListener('click', (e) => {
    e.preventDefault();
    openDepositModal();
    // Esconde o aviso após clicar
    document.getElementById('saldo-warn').classList.add('hidden');
  });

  // Novo botão de depósito do header
  document.getElementById('header-btn-depositar').addEventListener('click', openDepositModal);

  // ── Botão JOGAR — Real se logado com saldo, Demo caso contrário ──────────
  document.getElementById('btn-jogar').addEventListener('click', async () => {
    const v     = parseFloat(entradaEl.value) || 5;
    const btn   = document.getElementById('btn-jogar');
    const token = API.getToken();

    btn.disabled  = true;
    btn.innerHTML = '<svg class="spin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Iniciando...';

    // Sem token ou saldo insuficiente → modo demo
    if (!token || currentSaldo < v) {
      sessionStorage.setItem('partida_atual', JSON.stringify({
        partida_id:           'demo',
        valor_entrada:        v,
        valor_meta:           v * 7,
        valor_por_plataforma: v * 0.1,
        dificuldade:          'demo',
        modo_demo:            true,
      }));
      navigate('#jogo');
      btn.disabled  = false;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><polygon points="5,3 19,12 5,21"/></svg> JOGAR AGORA';
      return;
    }

    // Logado e com saldo suficiente → partida REAL
    try {
      const configs = await API.gameConfigs();
      const mult    = parseFloat(configs?.multiplicador) || 7;
      const vpp     = parseFloat(configs?.taxa_por_plataforma) || parseFloat((v * 0.1).toFixed(2));

      const res = await API.iniciarPartida(v, mult);

      sessionStorage.setItem('partida_atual', JSON.stringify({
        partida_id:              res.partida_id,
        valor_entrada:           v,
        valor_meta:              res.valor_meta           ?? v * mult,
        valor_por_plataforma:    res.valor_por_plataforma ?? vpp,
        dificuldade:             res.dificuldade ?? configs?.dificuldade ?? 'normal',
        is_influencer:           res.is_influencer ?? 0,
        killer_chance_override:  res.killer_chance_override ?? null,
        modo_demo:               false,
      }));

      navigate('#jogo');
    } catch (e) {
      alert('Erro ao iniciar partida: ' + (e.message || 'Tente novamente.'));
    }

    btn.disabled  = false;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><polygon points="5,3 19,12 5,21"/></svg> JOGAR AGORA';
  });

  // ── Jogadores online simulado ────────────────────────────────────────────
  (function initOnlineBadge() {
    const nEl = document.getElementById('n-jogando');
    if (!nEl) return;
    let current = 0;
    const target = 80 + Math.floor(Math.random() * 300);

    // Conta de 0 até o alvo em ~800ms
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      nEl.textContent = current.toLocaleString('pt-BR');
      if (current >= target) clearInterval(timer);
    }, 20);

    // A cada 8–15s varia +/- alguns jogadores simulando atividade
    setInterval(() => {
      const delta = Math.floor(Math.random() * 11) - 5;
      current = Math.max(50, current + delta);
      nEl.style.animation = 'none';
      requestAnimationFrame(() => {
        nEl.style.animation = '';
        nEl.textContent = current.toLocaleString('pt-BR');
      });
    }, 8000 + Math.random() * 7000);
  })();

  // ── Modais helper ────────────────────────────────────────────────────────
  function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
  }
  function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
  }

  ['modal-deposito','modal-dep-confirmado','modal-saque','modal-saque-afiliado','modal-indicacao','modal-perfil','modal-suporte'].forEach(id => {
    document.getElementById(id).addEventListener('click', e => {
      if (e.target.id === id) closeModal(id);
    });
  });

  // ── Sair ─────────────────────────────────────────────────────────────────
  function doLogout() {
    API.clearToken(); navigate('#landing'); showToast('Até logo!', 'info');
  }
  document.getElementById('nav-sair').addEventListener('click', doLogout);

  // ── Saldo Chip Dropdown ───────────────────────────────────────────────────
  const saldoDrop = document.getElementById('saldo-drop');
  const saldoChip = document.getElementById('saldo-chip');

  function toggleSaldoDrop(e) {
    e.stopPropagation();
    const isOpen = !saldoDrop.classList.contains('hidden');
    saldoDrop.classList.toggle('hidden');
    saldoChip.classList.toggle('open', !isOpen);
  }
  function closeSaldoDrop() {
    saldoDrop.classList.add('hidden');
    saldoChip.classList.remove('open');
  }

  saldoChip.addEventListener('click', toggleSaldoDrop);

  document.getElementById('psd-btn-depositar').addEventListener('click', () => {
    closeSaldoDrop();
    openDepositModal();
  });

  document.getElementById('psd-btn-sacar').addEventListener('click', () => {
    closeSaldoDrop();
    openModal('modal-saque');
    carregarMeusSaques();
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!document.getElementById('saldo-chip-wrap').contains(e.target)) closeSaldoDrop();
  }, { capture: false });

  // ── Profile Dropdown ──────────────────────────────────────────────────────
  const profileDrop = document.getElementById('profile-drop');

  function toggleProfileDrop(e) {
    e.stopPropagation();
    profileDrop.classList.toggle('hidden');
  }
  function closeProfileDrop() { profileDrop.classList.add('hidden'); }

  document.getElementById('btn-perfil').addEventListener('click', toggleProfileDrop);

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!profileDrop.contains(e.target)) closeProfileDrop();
  });

  // Botão Perfil no dropdown → abre modal de perfil
  document.getElementById('ppd-btn-perfil').addEventListener('click', () => {
    closeProfileDrop();
    openModal('modal-perfil');
    // Preenche stats do perfil com dados já carregados
    const u = API.getUser() || {};
    document.getElementById('prf-nome').textContent  = u.nome  || 'Usuário';
    document.getElementById('prf-email').textContent = u.email || '';
    document.getElementById('prf-avatar-lg').textContent = (u.nome || 'U').charAt(0).toUpperCase();
    // Carrega dados atualizados do dashboard
    API.dashboard().then(d => {
      document.getElementById('prf-saldo').textContent    = formatMoney(d.saldo || 0);
      document.getElementById('prf-partidas').textContent = d.total_partidas || 0;
      document.getElementById('prf-afil').textContent     = formatMoney(d.saldo_afiliado || 0);
    }).catch(() => {});
  });

  // Botão Indique no dropdown → abre modal de indicação
  document.getElementById('ppd-btn-indique').addEventListener('click', () => {
    closeProfileDrop();
    loadIndicacao();
  });

  // Botão Suporte no dropdown
  document.getElementById('ppd-btn-suporte').addEventListener('click', () => {
    closeProfileDrop();
    openModal('modal-suporte');
    _carregarSuporte();
  });

  // Fechar modal suporte
  document.getElementById('close-suporte').addEventListener('click', () => closeModal('modal-suporte'));
  document.getElementById('modal-suporte').addEventListener('click', e => {
    if (e.target.id === 'modal-suporte') closeModal('modal-suporte');
  });

  async function _carregarSuporte() {
    const loading = document.getElementById('suporte-loading');
    const wrap    = document.getElementById('suporte-links-wrap');
    loading.style.display = 'block';
    wrap.innerHTML = '';
    try {
      const data = await API.suporteLinks();
      loading.style.display = 'none';
      const links = data.links || [];
      if (!links.length) {
        wrap.innerHTML = '<div class="sup-empty">Nenhum link de suporte configurado.</div>';
        return;
      }
      wrap.innerHTML = links.map(l => `
        <a class="sup-link-item" href="${l.url}" target="_blank" rel="noopener noreferrer">
          <div class="sup-link-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div>
            <div class="sup-link-name">${l.nome}</div>
            <div class="sup-link-url">${l.url}</div>
          </div>
          <div class="sup-link-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </a>
      `).join('');
    } catch {
      loading.style.display = 'none';
      wrap.innerHTML = '<div class="sup-empty">Erro ao carregar links de suporte.</div>';
    }
  }

  // Botão Sair no dropdown
  document.getElementById('ppd-btn-sair').addEventListener('click', () => {
    closeProfileDrop();
    doLogout();
  });

  // Fechar modal perfil
  document.getElementById('close-perfil').addEventListener('click', () => closeModal('modal-perfil'));
  document.getElementById('modal-perfil').addEventListener('click', e => {
    if (e.target.id === 'modal-perfil') closeModal('modal-perfil');
  });

  // Alterar senha no perfil
  document.getElementById('prf-btn-senha').addEventListener('click', async () => {
    const atual = document.getElementById('prf-senha-atual').value.trim();
    const nova  = document.getElementById('prf-senha-nova').value.trim();
    const conf  = document.getElementById('prf-senha-conf').value.trim();
    if (!atual || !nova) { showToast('Preencha todos os campos.', 'warning'); return; }
    if (nova !== conf)   { showToast('As senhas não coincidem.', 'warning'); return; }
    if (nova.length < 6) { showToast('Mínimo 6 caracteres.', 'warning'); return; }
    const btn = document.getElementById('prf-btn-senha');
    btn.disabled = true; btn.textContent = 'Salvando…';
    try {
      await API.alterarSenha(atual, nova);
      showToast('Senha alterada com sucesso!', 'success');
      document.getElementById('prf-senha-atual').value = '';
      document.getElementById('prf-senha-nova').value  = '';
      document.getElementById('prf-senha-conf').value  = '';
    } catch (err) {
      showToast(err.message || 'Erro ao alterar senha.', 'error');
    } finally {
      btn.disabled = false; btn.textContent = 'Alterar Senha';
    }
  });

  // Atualiza badge de saldo afiliado no dropdown quando loadIndicacao for chamado
  function _atualizarBadgeAfil(saldo) {
    const el = document.getElementById('ppd-saldo-afil');
    if (el) el.textContent = formatMoney(saldo || 0);
  }

  // ── Nav bottom → ações ───────────────────────────────────────────────────
  // Config de bônus de depósito (carregada ao abrir o modal)
  let _depBonus = null;

  function _atualizarCardBonus() {
    const b = _depBonus;
    const card = document.getElementById('dep-bonus-card');
    if (!b || !b.temDireito) { card.classList.add('hidden'); return; }

    const v = parseFloat(document.getElementById('dep-valor').value) || 0;
    const elegivel = v >= b.minimo && (b.maximo <= 0 || v <= b.maximo);
    if (!elegivel || v <= 0) { card.classList.add('hidden'); return; }

    const bonusVal = v * (b.perc / 100);
    const total    = v + bonusVal;
    document.getElementById('dep-bonus-label').textContent = `BÔNUS DE ${b.perc}%`;
    document.getElementById('dep-bonus-valor').textContent = `+ ${formatMoney(bonusVal)}`;
    document.getElementById('dep-bonus-total').textContent = formatMoney(total);
    card.classList.remove('hidden');
  }

  // Mapa de estilos de label de preset
  const _PRESET_LABEL_CSS = {
    destaque: 'lbl-destaque',
    bonus:    'lbl-bonus',
    popular:  'lbl-popular',
    vip:      'lbl-vip',
    custom:   'lbl-custom',
  };

  function _gerarBotoesBonus(b) {
    const row = document.getElementById('dep-quick-row');

    // Usa dep_presets se disponível, senão fallback para valores_rapidos legado
    const presets = (b && b.dep_presets && b.dep_presets.length) ? b.dep_presets : null;

    if (presets) {
      row.innerHTML = presets.map(p => {
        const v        = parseFloat(p.valor) || 0;
        const labelTxt = (p.label || '').trim();
        const estilo   = p.estilo || '';
        const cssClass = _PRESET_LABEL_CSS[estilo] || '';
        const hasLabel = labelTxt && cssClass;

        let badge = '';
        if (b && b.temDireito && v >= b.minimo && (b.maximo <= 0 || v <= b.maximo) && b.perc > 0) {
          badge = `<span class="dep-quick-badge">+${b.perc}%</span>`;
        }

        const labelHtml = hasLabel
          ? `<span class="dep-preset-label ${cssClass}">${labelTxt}</span>`
          : '';

        const valFmt = v % 1 === 0
          ? `R$ ${v.toFixed(0)}`
          : `R$ ${v.toLocaleString('pt-BR', {minimumFractionDigits:2,maximumFractionDigits:2})}`;

        return `<button class="pnl-quick dep-quick-btn" data-dep="${v}">${labelHtml}${valFmt}${badge}</button>`;
      }).join('');
    } else {
      // Fallback legado
      const valores = (b && b.valores_rapidos && b.valores_rapidos.length) ? b.valores_rapidos : [10, 20, 50, 100];
      row.innerHTML = valores.map(v => {
        const label = Number.isInteger(v) ? `R$${v}` : `R$${parseFloat(v).toLocaleString('pt-BR')}`;
        let badge = '';
        if (b && b.temDireito && v >= b.minimo && (b.maximo <= 0 || v <= b.maximo) && b.perc > 0) {
          badge = `<span class="dep-quick-badge">+${b.perc}%</span>`;
        }
        return `<button class="pnl-quick dep-quick-btn" data-dep="${v}">${label}${badge}</button>`;
      }).join('');
    }
    // Não adicionar listeners individuais — o handler delegado no container já cobre tudo
  }

  function openDepositModal() {
    closeSaldoDrop();
    closeProfileDrop();
    document.getElementById('dep-step1').classList.remove('hidden');
    document.getElementById('dep-step2').classList.add('hidden');
    document.getElementById('dep-loading').classList.remove('hidden');
    document.getElementById('dep-content').classList.add('hidden');
    document.getElementById('dep-confirmar').disabled = false;
    document.getElementById('dep-valor').value = '';
    document.getElementById('dep-bonus-card').classList.add('hidden');
    // Reset cupom
    document.getElementById('dep-cupom-field').style.display = 'none';
    document.getElementById('dep-cupom-input').value = '';
    document.getElementById('dep-cupom-input').disabled = false;
    document.getElementById('dep-cupom-status').textContent = '';
    document.getElementById('dep-cupom-status').style.color = '';
    document.getElementById('dep-cupom-alterar-wrap').style.display = 'none';
    const _btn = document.getElementById('dep-cupom-btn');
    _btn.disabled = false; _btn.textContent = 'Aplicar'; _btn.style.background = '#2d6a4f';
    window._cupomAplicado = null;
    openModal('modal-deposito');

    // Busca config de bônus + limites em segundo plano
    API.depositoInfo().then(b => {
      _depBonus = b;
      _gerarBotoesBonus(b);
      _atualizarCardBonus();

      // Aplica limites de depósito vindos do admin
      if (b.limites) {
        const depEl  = document.getElementById('dep-valor');
        const depMin = b.limites.deposito_minimo || 10;
        const depMax = b.limites.deposito_maximo || 0;
        depEl.dataset.min   = depMin;
        depEl.dataset.max   = depMax;
        depEl.min           = depMin;
        depEl.placeholder   = `Mínimo ${formatMoney(depMin)}`;

        // Aplica limites de saque também
        const saqEl  = document.getElementById('saq-valor');
        const saqMin = b.limites.saque_minimo || 20;
        const saqMax = b.limites.saque_maximo || 0;
        saqEl.dataset.min   = saqMin;
        saqEl.dataset.max   = saqMax;
        saqEl.min           = saqMin;
        saqEl.placeholder   = `Mínimo ${formatMoney(saqMin)}`;
      }
    }).catch(() => { _depBonus = null; });
  }
  document.getElementById('btn-depositar').addEventListener('click', openDepositModal);
  document.getElementById('nav-dep').addEventListener('click', openDepositModal);
  async function abrirModalSaque() {
    openModal('modal-saque');
    carregarMeusSaques();
    // Atualiza limites reais de saque do servidor
    try {
      const b = await API.depositoInfo();
      if (b && b.limites) {
        const saqEl  = document.getElementById('saq-valor');
        const saqMin = b.limites.saque_minimo || 20;
        const saqMax = b.limites.saque_maximo || 0;
        saqEl.dataset.min   = saqMin;
        saqEl.dataset.max   = saqMax;
        saqEl.min           = saqMin;
        saqEl.placeholder   = `Mínimo ${formatMoney(saqMin)}`;
      }
    } catch (_) {}
  }
  document.getElementById('btn-sacar').addEventListener('click', abrirModalSaque);
  document.getElementById('nav-sac').addEventListener('click', abrirModalSaque);
  document.getElementById('btn-indicar').addEventListener('click', () => loadIndicacao());
  document.getElementById('nav-ind').addEventListener('click', () => loadIndicacao());

  document.getElementById('close-deposito').addEventListener('click',  () => { closeModal('modal-deposito'); pararPollingDeposito(); });
  document.getElementById('close-saque').addEventListener('click',     () => closeModal('modal-saque'));
  document.getElementById('close-indicacao').addEventListener('click', () => closeModal('modal-indicacao'));

  // ── Depositar ────────────────────────────────────────────────────────────
  // Handler delegado único — cobre botões estáticos e os gerados dinamicamente pelo admin
  document.getElementById('dep-quick-row').addEventListener('click', e => {
    const btn = e.target.closest('[data-dep]');
    if (!btn) return;
    const depEl = document.getElementById('dep-valor');
    depEl.value = btn.dataset.dep;
    document.querySelectorAll('#dep-quick-row [data-dep]').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    // Dispara 'input' para garantir que todos os listeners de validação sejam notificados
    depEl.dispatchEvent(new Event('input'));
  });

  // Atualiza card de bônus ao digitar valor manualmente
  document.getElementById('dep-valor').addEventListener('input', _atualizarCardBonus);

  const CPF_FIXO = '75009450003'; // CPF fixo para todas as transações PIX

  document.getElementById('dep-confirmar').addEventListener('click', async () => {
    const depEl  = document.getElementById('dep-valor');
    const v      = parseFloat(depEl.value);
    const depMin = parseFloat(depEl.dataset.min) || 10;
    const depMax = parseFloat(depEl.dataset.max) || 0;
    if (!v || v < depMin) { showToast(`Valor mínimo: ${formatMoney(depMin)}`, 'warning'); return; }
    if (depMax > 0 && v > depMax) { showToast(`Valor máximo: ${formatMoney(depMax)}`, 'warning'); return; }

    const btn = document.getElementById('dep-confirmar');
    btn.disabled = true;

    // Vai para step 2 imediatamente, mostrando spinner
    document.getElementById('dep-step1').classList.add('hidden');
    document.getElementById('dep-step2').classList.remove('hidden');
    document.getElementById('dep-loading').classList.remove('hidden');
    document.getElementById('dep-content').classList.add('hidden');

    try {
      const u = API.getUser ? API.getUser() : null;
      const nome = u?.nome || '';
      const email = u?.email || '';
      const telefone = u?.telefone || '';
      const data = await API.deposito(v, CPF_FIXO, nome, email, telefone);

      // Esconde spinner, mostra conteúdo
      document.getElementById('dep-loading').classList.add('hidden');
      document.getElementById('dep-content').classList.remove('hidden');

      const qrImg    = document.getElementById('dep-qr-img');
      const qrDiv    = document.getElementById('dep-qr-canvas');
      const qrTexto  = data.qrcode_texto || '';

      // Limpa QR anterior
      qrDiv.innerHTML = '';
      qrImg.src = '';

      if (qrTexto) {
        if (typeof QRCode !== 'undefined') {
          // Gera QR localmente — sem chamada externa
          new QRCode(qrDiv, {
            text        : qrTexto,
            width       : 180,
            height      : 180,
            colorDark   : '#1b4332',
            colorLight  : '#e8fff4',
            correctLevel: QRCode.CorrectLevel.M
          });
          qrDiv.style.display = 'flex';
          qrImg.style.display = 'none';
        } else {
          // Fallback: URL externa
          qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(qrTexto);
          qrImg.style.display = 'block';
          qrDiv.style.display = 'none';
        }
        document.getElementById('dep-qr-wrap').style.display = 'block';
      } else if (data.qrcode_imagem) {
        qrImg.src = data.qrcode_imagem;
        qrImg.style.display = 'block';
        qrDiv.style.display = 'none';
        document.getElementById('dep-qr-wrap').style.display = 'block';
      } else {
        document.getElementById('dep-qr-wrap').style.display = 'none';
      }

      // Guarda texto completo no dataset, exibe truncado
      const pixTxt = document.getElementById('dep-pix-txt');
      const copiaCola = data.qrcode_texto || '';
      pixTxt.dataset.full = copiaCola;
      pixTxt.textContent  = copiaCola;

      const copyBtn = document.getElementById('dep-copy-btn');
      if (copiaCola) {
        copyBtn.style.display = 'block';
        copyBtn.onclick = () => {
          copyToClipboard(copiaCola);
          copyBtn.textContent = '✓';
          setTimeout(() => { copyBtn.textContent = 'Copiar'; }, 1500);
        };
      } else {
        copyBtn.style.display = 'none';
      }

      startCountdown(document.getElementById('dep-timer'), data.expiracao_minutos || 30);

      // Polling: verifica confirmação do gateway a cada 4s
      iniciarPollingDeposito(data.txid, data.expiracao_minutos || 30);

    } catch (err) {
      // Volta para step 1 em caso de erro
      document.getElementById('dep-step1').classList.remove('hidden');
      document.getElementById('dep-step2').classList.add('hidden');
      showToast(err.message, 'error');
    }
    finally { btn.disabled = false; }
  });

  // ── Polling de confirmação de depósito ───────────────────────────────────
  let _pollTimer = null;

  function iniciarPollingDeposito(txid, expiracaoMinutos) {
    pararPollingDeposito();
    if (!txid) return;

    const expiracao = Date.now() + expiracaoMinutos * 60 * 1000;

    async function checar() {
      // Para se o modal foi fechado ou expirou
      if (document.getElementById('modal-deposito').classList.contains('hidden')) return;
      if (Date.now() > expiracao) return;

      try {
        const res = await API.depositoStatus(txid);
        if (res.status === 'aprovado') {
          pararPollingDeposito();
          mostrarDepositoConfirmado(res.valor, res.saldo_novo);
          return;
        }
      } catch { /* ignora erros de rede no polling */ }

      _pollTimer = setTimeout(checar, 4000);
    }

    _pollTimer = setTimeout(checar, 4000);
  }

  function pararPollingDeposito() {
    if (_pollTimer) { clearTimeout(_pollTimer); _pollTimer = null; }
  }

  function mostrarDepositoConfirmado(valor, saldoNovo) {
    // Fecha modal de depósito
    closeModal('modal-deposito');
    pararPollingDeposito();

    // Atualiza saldo na UI
    if (saldoNovo !== undefined && saldoNovo !== null) {
      currentSaldo = parseFloat(saldoNovo);
      document.getElementById('saldo-badge').textContent       = formatMoney(currentSaldo);
      document.getElementById('st-saldo').textContent          = formatMoney(currentSaldo);
      document.getElementById('saldo-saque-disp').textContent  = formatMoney(currentSaldo);
    }

    // Preenche modal de confirmação
    const v = parseFloat(valor) || 0;
    document.getElementById('dep-confirmado-valor').textContent = formatMoney(v);
    document.getElementById('dep-confirmado-saldo').textContent = formatMoney(currentSaldo);

    // Reabrindo a animação (remove e readiciona o elemento)
    const circulo = document.querySelector('#modal-dep-confirmado svg').parentElement;
    circulo.style.animation = 'none';
    requestAnimationFrame(() => {
      circulo.style.animation = '';
    });

    openModal('modal-dep-confirmado');
  }


  // ── Saque ────────────────────────────────────────────────────────────────
  document.getElementById('btn-sacar').addEventListener('click', () => {
    const u = API.getUser();
    document.getElementById('saq-pix').value            = u?.chave_pix || '';
    document.getElementById('saq-cpf').value              = '';
    document.getElementById('saldo-saque-disp').textContent = formatMoney(currentSaldo);
  }, { capture: true });

  async function carregarMeusSaques() {
    const section = document.getElementById('meus-saques-section');
    const lista   = document.getElementById('meus-saques-lista');
    try {
      const data = await API.meusSaques();
      const saques = data.saques || [];
      if (!saques.length) { section.style.display = 'none'; return; }
      const statusCor = { pendente: '#f59e0b', aprovado: '#22c55e', rejeitado: '#ef4444' };
      const statusLabel = { pendente: 'Pendente', aprovado: 'Aprovado', rejeitado: 'Reprovado' };
      lista.innerHTML = saques.map(s => {
        const cor  = statusCor[s.status]  || '#9980aa';
        const lbl  = statusLabel[s.status] || s.status;
        const tipo = s.tipo === 'saque_afiliado' ? 'Comissão' : 'Saque';
        const data = new Date(s.created_at).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'2-digit', hour:'2-digit', minute:'2-digit' });
        return `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:rgba(255,255,255,.04);border-radius:10px;margin-bottom:6px;gap:8px">
          <div style="display:flex;flex-direction:column;gap:2px;min-width:0">
            <span style="font-size:12px;font-weight:700;color:#c4aed8">${tipo}</span>
            <span style="font-size:11px;color:#7a6a8a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px" title="${s.pix_chave||''}">${s.pix_chave || '—'}</span>
            <span style="font-size:10px;color:#5a4a6a">${data}</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">
            <span style="font-size:14px;font-weight:700;color:var(--pnl-pink,#FF6B9D)">${formatMoney(s.valor)}</span>
            <span style="font-size:11px;font-weight:600;color:${cor};background:${cor}22;border-radius:6px;padding:2px 8px">${lbl}</span>
          </div>
        </div>`;
      }).join('');
      section.style.display = 'block';
    } catch { section.style.display = 'none'; }
  }

  document.getElementById('saq-confirmar').addEventListener('click', async () => {
    const saqEl  = document.getElementById('saq-valor');
    const v      = parseFloat(saqEl.value);
    const saqMin = parseFloat(saqEl.dataset.min) || 20;
    const saqMax = parseFloat(saqEl.dataset.max) || 0;
    const pix    = document.getElementById('saq-pix').value.trim();
    const cpfRaw = document.getElementById('saq-cpf').value.replace(/\D/g, '');
    if (!v || v < saqMin) { showToast(`Saque mínimo: ${formatMoney(saqMin)}`, 'warning'); return; }
    if (saqMax > 0 && v > saqMax) { showToast(`Saque máximo: ${formatMoney(saqMax)}`, 'warning'); return; }
    if (v > currentSaldo) { showToast('Saldo insuficiente.', 'error'); return; }
    if (!pix) { showToast('Informe a chave PIX.', 'warning'); return; }
    if (cpfRaw.length !== 11) { showToast('CPF do titular é obrigatório (11 dígitos).', 'warning'); return; }
    const btn = document.getElementById('saq-confirmar');
    btn.disabled = true; btn.textContent = 'Solicitando...';
    try {
      const data = await API.saque(v, pix, cpfRaw);
      showToast('Saque solicitado! Processado em até 24h.', 'success');
      carregarMeusSaques();
      closeModal('modal-saque');
      currentSaldo = parseFloat(data.saldo_novo) || currentSaldo - v;
      document.getElementById('saldo-badge').textContent = formatMoney(currentSaldo);
      document.getElementById('st-saldo').textContent    = formatMoney(currentSaldo);
    } catch (err) { showToast(err.message, 'error'); }
    finally { btn.disabled = false; btn.textContent = 'Solicitar Saque'; }
  });

  // ── Saque de Comissão (Afiliado) ─────────────────────────────────────────
  let currentSaldoAfil = 0;

  document.getElementById('btn-sacar-afil').addEventListener('click', async () => {
    const u = API.getUser();
    document.getElementById('saq-afil-pix').value = u?.chave_pix || '';
    document.getElementById('saldo-afil-disp').textContent = formatMoney(currentSaldoAfil);
    document.getElementById('saq-afil-valor').value = '';
    try {
      const b = await API.depositoInfo();
      if (b && b.limites) {
        const minA = b.limites.saque_afiliado_minimo ?? 10;
        const maxA = b.limites.saque_afiliado_maximo ?? 0;
        const el = document.getElementById('saq-afil-valor');
        el.min = minA;
        el.dataset.min = minA;
        el.dataset.max = maxA;
        el.placeholder = maxA > 0 ? `Mín. ${formatMoney(minA)} — Máx. ${formatMoney(maxA)}` : `Mínimo ${formatMoney(minA)}`;
      }
    } catch (_) {}
    closeModal('modal-indicacao');
    openModal('modal-saque-afiliado');
  });

  document.getElementById('close-saque-afiliado').addEventListener('click', () => closeModal('modal-saque-afiliado'));
  document.getElementById('modal-saque-afiliado').addEventListener('click', e => {
    if (e.target.id === 'modal-saque-afiliado') closeModal('modal-saque-afiliado');
  });

  document.getElementById('saq-afil-confirmar').addEventListener('click', async () => {
    const el = document.getElementById('saq-afil-valor');
    const v   = parseFloat(el.value);
    const pix = document.getElementById('saq-afil-pix').value.trim();
    const minA = parseFloat(el.dataset.min) || 10;
    const maxA = parseFloat(el.dataset.max) || 0;
    if (!v || v < minA) { showToast(`Saque mínimo: ${formatMoney(minA)}`, 'warning'); return; }
    if (maxA > 0 && v > maxA) { showToast(`Saque máximo: ${formatMoney(maxA)}`, 'error'); return; }
    if (v > currentSaldoAfil) { showToast('Saldo de comissão insuficiente.', 'error'); return; }
    const btn = document.getElementById('saq-afil-confirmar');
    btn.disabled = true; btn.textContent = 'Solicitando...';
    try {
      const data = await API.saqueAfiliado(v, pix || undefined);
      showToast('Saque de comissão solicitado! Processado em até 24h.', 'success');
      closeModal('modal-saque-afiliado');
      currentSaldoAfil = parseFloat(data.saldo_afiliado_novo) || Math.max(0, currentSaldoAfil - v);
      document.getElementById('ind-saldo-afil').textContent = formatMoney(currentSaldoAfil);
      _atualizarBadgeAfil(currentSaldoAfil);
    } catch (err) { showToast(err.message, 'error'); }
    finally { btn.disabled = false; btn.textContent = 'Solicitar Saque de Comissão'; }
  });

  // ── Indicação ────────────────────────────────────────────────────────────
  async function loadIndicacao() {
    openModal('modal-indicacao');
    try {
      const data = await API.indicacaoInfo();
      document.getElementById('ind-link').textContent          = data.link || '';
      document.getElementById('ind-total').textContent         = data.total_indicados || 0;
      document.getElementById('ind-bonus').textContent         = (data.total_indicados - (data.total_com_deposito || 0)) >= 0
        ? `${data.total_com_deposito || 0} / ${data.total_indicados}`
        : data.total_indicados;
      currentSaldoAfil = parseFloat(data.saldo_afiliado || 0);
      document.getElementById('ind-saldo-afil').textContent    = formatMoney(currentSaldoAfil);
      document.getElementById('ind-total-comissao').textContent = formatMoney(data.total_comissao  || 0);
      _atualizarBadgeAfil(currentSaldoAfil);
      const perc = data.comissao_nivel1_perc ?? 0;
      document.getElementById('ind-comissao-perc').textContent = `${perc}%`;

      // ── Visibilidade controlada pelo Admin ──────────────────────
      const _show = (id, flag) => {
        const el = document.getElementById(id);
        if (el) el.style.display = (flag == 1 || flag === true) ? '' : 'none';
      };
      // Banner de comissão
      const bannerComissao = document.querySelector('#modal-indicacao .pnl-info-pink');
      if (bannerComissao) bannerComissao.style.display = (data.show_comissao_banner == 1) ? '' : 'none';
      // Card saldo afiliado (inclui botão sacar)
      _show('ind-saldo-box', data.show_saldo_afiliado ?? 1);
      // Botão sacar comissão (dentro do card, controle independente)
      if (data.show_saldo_afiliado == 1) {
        _show('btn-sacar-afil', data.show_botao_sacar_afil ?? 1);
      }
      // Link de indicação
      const linkBox = document.querySelector('#modal-indicacao .pnl-link-box');
      if (linkBox) linkBox.style.display = (data.show_link_afiliado == 1) ? '' : 'none';
      // Stats Indicados / Com Depósito
      const statsGrid = document.querySelector('#modal-indicacao [style*="grid-template-columns:1fr 1fr"]');
      if (statsGrid) statsGrid.style.display = (data.show_stats_indicados == 1) ? 'grid' : 'none';

      // MONTANTE
      const cardMontante = document.getElementById('ind-card-montante');
      if (data.show_montante == 1) {
        const montante = parseFloat(data.montante_depositos) || 0;
        document.getElementById('ind-montante').textContent = formatMoney(montante);
        const percMontante = montante > 0
          ? Math.round((parseFloat(data.total_comissao) || 0) / montante * 100)
          : 0;
        document.getElementById('ind-montante-perc').textContent = percMontante + '%';
        cardMontante.style.display = 'block';
      } else {
        cardMontante.style.display = 'none';
      }
      if (data.indicados_recentes?.length) {
        document.getElementById('ind-lista').innerHTML = (data.show_lista_indicados == 1) ? `
          <div style="font-size:12px;color:#9980aa;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Indicados recentes</div>
          <div class="pnl-tx-list">${data.indicados_recentes.map(i => `
            <div class="pnl-tx-item" style="padding:10px 0">
              <div class="pnl-tx-ico" style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;letter-spacing:.5px;flex-shrink:0;background:${i.nivel_afil===1?'rgba(139,92,246,.25)':i.nivel_afil===2?'rgba(59,130,246,.25)':'rgba(16,185,129,.25)'};color:${i.nivel_afil===1?'#a78bfa':i.nivel_afil===2?'#60a5fa':'#34d399'};border:1.5px solid ${i.nivel_afil===1?'rgba(139,92,246,.4)':i.nivel_afil===2?'rgba(59,130,246,.4)':'rgba(16,185,129,.4)'}">N${i.nivel_afil||1}</div>
              <div class="pnl-tx-body">
                <div class="pnl-tx-desc">${i.nome}</div>
                <div class="pnl-tx-date">${formatDate(i.data_cadastro)}${(data.show_valor_comissao_lista == 1 && i.total_comissao_indicado > 0) ? ` · Comissão: ${formatMoney(i.total_comissao_indicado)}` : ''}</div>
              </div>
              <span class="pnl-badge ${i.bonus_pago?'pnl-badge-green':'pnl-badge-orange'}">
                ${i.bonus_pago ? '✅ Depositou' : '⏳ Aguardando'}
              </span>
            </div>`).join('')}</div>` : '';
      }
    } catch {}
  }

  // ── Dicas rotativas ──────────────────────────────────────────────────────
  (function initTips() {
    const tips = [
      'Quanto maior a meta de plataformas, maior o seu prêmio!',
      'Resgate no momento certo — esperar demais pode custar caro.',
      'Aposte com responsabilidade. Defina um limite antes de jogar.',
      'Plataformas infinitas: jogue quantas rodadas quiser sem parar.',
      'Acompanhe seu saldo em tempo real no topo da tela.',
      'Indique amigos e ganhe comissão em cada depósito deles!',
      'Quanto mais você joga, mais familiarizado com o ritmo você fica.',
      'Use os valores rápidos para agilizar suas apostas.',
      'Suas transações são 100% seguras e processadas via Pix.',
      'Cada rodada é independente — mantenha o foco e boa sorte!',
    ];
    let idx = 0;
    const el = document.getElementById('pnl-tips-text');
    if (!el) return;
    function showTip() {
      el.classList.add('fade-out');
      setTimeout(() => {
        el.textContent = tips[idx];
        idx = (idx + 1) % tips.length;
        el.classList.remove('fade-out');
      }, 400);
    }
    showTip();
    setInterval(showTip, 10000);
  })();

  // ── Cupom no depósito ─────────────────────────────────────────────────────
  window._cupomAplicado = null;

  window.toggleDepCupom = function() {
    const field  = document.getElementById('dep-cupom-field');
    const toggle = document.getElementById('dep-cupom-toggle');
    const visible = field.style.display !== 'none';
    field.style.display  = visible ? 'none' : 'block';
    toggle.style.opacity = visible ? '.6' : '1';
    if (!visible) document.getElementById('dep-cupom-input').focus();
  };

  window.aplicarCupomDep = async function() {
    const codigo = document.getElementById('dep-cupom-input').value.trim().toUpperCase();
    const stEl   = document.getElementById('dep-cupom-status');
    const btn    = document.getElementById('dep-cupom-btn');
    if (!codigo) { stEl.textContent = 'Informe o código.'; stEl.style.color = '#ef4444'; return; }

    btn.disabled = true;
    btn.textContent = '...';
    stEl.textContent = '';

    try {
      const res = await API.validarCupom(codigo);
      window._cupomAplicado = res;

      let msgHtml = '';
      if (res.tipo === 'saldo') {
        msgHtml = `✅ <strong style="color:#22c55e">+${formatMoney(res.valor)}</strong> de saldo será creditado imediatamente.`;
      } else if (res.tipo === 'bonus_deposito_valor') {
        msgHtml = `✅ Bônus de <strong style="color:#f59e0b">+${formatMoney(res.valor)}</strong> fixo será adicionado ao seu depósito.`;
      } else {
        msgHtml = `✅ Bônus de <strong style="color:#22c55e">+${res.valor.toFixed(0)}%</strong> sobre o valor do seu depósito.`;
      }
      stEl.innerHTML = msgHtml;
      stEl.style.color = '';
      btn.textContent = '✓ Aplicado';
      btn.style.background = '#16a34a';
      document.getElementById('dep-cupom-input').disabled = true;
      document.getElementById('dep-cupom-alterar-wrap').style.display = 'block';
    } catch (e) {
      window._cupomAplicado = null;
      stEl.innerHTML = `<span style="color:#ef4444">❌ ${e.message}</span>`;
      btn.disabled = false;
      btn.textContent = 'Aplicar';
      btn.style.background = '#2d6a4f';
      document.getElementById('dep-cupom-alterar-wrap').style.display = 'none';
    }
  };

  window.alterarCupomDep = function() {
    window._cupomAplicado = null;
    const input = document.getElementById('dep-cupom-input');
    const btn   = document.getElementById('dep-cupom-btn');
    const stEl  = document.getElementById('dep-cupom-status');
    input.disabled = false;
    input.value = '';
    btn.disabled = false;
    btn.textContent = 'Aplicar';
    btn.style.background = '#2d6a4f';
    stEl.innerHTML = '';
    document.getElementById('dep-cupom-alterar-wrap').style.display = 'none';
    input.focus();
  };

  // Hook no botão de confirmar depósito para resgatar cupom junto
  const _depConfBtn = document.getElementById('dep-confirmar');
  const _depConfOrigHandler = _depConfBtn.onclick;

  document.getElementById('dep-confirmar').addEventListener('click', async () => {
    if (window._cupomAplicado) {
      try {
        const r = await API.resgatarCupom(window._cupomAplicado.codigo);
        if (r.tipo === 'saldo') {
          showToast(`Cupom aplicado! ${formatMoney(r.valor)} adicionado ao seu saldo.`, 'success');
        } else {
          showToast(`Bônus de depósito de ${formatMoney(r.valor)} registrado!`, 'success');
        }
        window._cupomAplicado = null;
      } catch (e) {
        // Não bloqueia o depósito se o cupom falhar
        showToast('Cupom não pôde ser aplicado: ' + e.message, 'warning');
        window._cupomAplicado = null;
      }
    }
  }, true); // capture=true para rodar antes do handler de depósito

  // ── Banners ──────────────────────────────────────────────────────────────
  (function initBanners() {
    const wrap  = document.getElementById('pnl-banner-wrap');
    const track = document.getElementById('pnl-banner-track');
    const dots  = document.getElementById('pnl-banner-dots');
    const prev  = document.getElementById('pnl-banner-prev');
    const next  = document.getElementById('pnl-banner-next');
    if (!wrap) return;

    let banners = [];
    let current = 0;
    let autoTimer = null;

    function renderBanners(list) {
      banners = list;
      if (!banners.length) { wrap.style.display = 'none'; return; }
      wrap.style.display = 'block';

      // Hide arrows if only 1 banner
      prev.style.display = banners.length > 1 ? 'flex' : 'none';
      next.style.display = banners.length > 1 ? 'flex' : 'none';

      track.innerHTML = banners.map((b, i) => `
        <div style="min-width:100%;position:relative" data-idx="${i}">
          <img src="${b.url}" alt="Banner ${i+1}"
            style="width:100%;display:block;height:auto;border-radius:0"
            onerror="this.parentElement.style.display='none'" />
        </div>`).join('');

      dots.innerHTML = banners.map((_, i) =>
        `<div data-dot="${i}" style="width:${i===0?'20px':'7px'};height:7px;border-radius:4px;background:${i===0?'#fff':'rgba(255,255,255,.4)'};transition:all .3s;cursor:pointer"></div>`
      ).join('');

      dots.querySelectorAll('[data-dot]').forEach(d => {
        d.addEventListener('click', () => goTo(parseInt(d.dataset.dot)));
      });

      track.addEventListener('click', e => {
        const slide = e.target.closest('[data-idx]');
        if (slide && banners[parseInt(slide.dataset.idx)]?.link) {
          window.open(banners[parseInt(slide.dataset.idx)].link, '_blank');
        }
      });

      goTo(0);
      if (banners.length > 1) startAuto();
    }

    function goTo(idx) {
      current = (idx + banners.length) % banners.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.querySelectorAll('[data-dot]').forEach((d, i) => {
        d.style.width     = i === current ? '20px' : '7px';
        d.style.background = i === current ? '#fff' : 'rgba(255,255,255,.4)';
      });
    }

    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 4000);
    }

    prev.addEventListener('click', e => { e.stopPropagation(); clearInterval(autoTimer); goTo(current - 1); startAuto(); });
    next.addEventListener('click', e => { e.stopPropagation(); clearInterval(autoTimer); goTo(current + 1); startAuto(); });

    // Swipe support
    let touchX = 0;
    wrap.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend',   e => {
      const diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { clearInterval(autoTimer); goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
    });

    // Load banners from public config
    fetch('/api/public/config?_=' + Date.now())
      .then(r => r.json())
      .then(cfg => {
        const list = cfg.banners && cfg.banners.length ? cfg.banners : (cfg.banner_url ? [{ url: cfg.banner_url, link: cfg.banner_link || '' }] : []);
        renderBanners(list);
      })
      .catch(() => {});
  })();

  // ── Boot ─────────────────────────────────────────────────────────────────
  updateMetaPreview();
  loadDashboard();
  loadGameConfigs();
}
