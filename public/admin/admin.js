const token = localStorage.getItem('hw_token');
let usersData = [];
let saquesData = [];

if (!token) {
    showToast('Acesso Negado! Faça login primeiro.', 'error');
    setTimeout(() => { window.location.href = '/'; }, 1500);
}

// ══════════ TOAST SYSTEM ══════════
function showToast(msg, type = 'success') {
    const container = document.getElementById('adm-toast-container');
    const el = document.createElement('div');
    el.className = `adm-toast ${type}`;
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => { el.remove(); }, 4000);
}

// ══════════ MODAL HELPERS ══════════
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// ══════════ TABS ══════════
function showTab(event, id) {
    if (event) event.preventDefault();
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(el => el.classList.remove('active'));
    
    const tab = document.getElementById(`tab-${id}`);
    if (tab) tab.classList.add('active');
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    
    if (id === 'users') loadUsers();
    if (id === 'saques') loadSaques();
}

// ══════════ API REQUEST ══════════
async function apiRequest(method, endpoint, body = null) {
    try {
        const opt = {
            method,
            headers: { 'Authorization': `Bearer ${token}` }
        };
        if (body) {
            opt.headers['Content-Type'] = 'application/json';
            opt.body = JSON.stringify(body);
        }
        const res = await fetch(`/api/admin${endpoint}`, opt);
        if (res.status === 401 || res.status === 403) {
            showToast('Sem permissão de Administrador. Redirecionando...', 'error');
            setTimeout(() => { window.location.href = '/'; }, 2000);
            return null;
        }
        const data = await res.json();
        if (!res.ok) {
            showToast(data.error || 'Erro do servidor.', 'error');
            return null;
        }
        return data;
    } catch (e) {
        console.error('[API Error]', e);
        showToast('Erro de conexão com o servidor.', 'error');
        return null;
    }
}

// ══════════ DASHBOARD ══════════
async function loadDashboard() {
    usersData = await apiRequest('GET', '/users') || [];
    saquesData = await apiRequest('GET', '/saques') || [];
    
    document.getElementById('total-users').innerText = usersData.length;
    document.getElementById('total-pendentes').innerText = saquesData.filter(s => s.status === 'pendente').length;
    
    const saldoTotal = usersData.reduce((acc, u) => acc + (u.saldo || 0), 0);
    document.getElementById('total-saldo-users').innerText = `R$ ${saldoTotal.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
}

// ══════════ USERS TABLE ══════════
async function loadUsers() {
    const tbody = document.querySelector('#table-users tbody');
    tbody.innerHTML = '<tr><td colspan="5">Carregando...</td></tr>';
    
    usersData = await apiRequest('GET', '/users') || [];
    tbody.innerHTML = '';
    
    if (usersData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted)">Nenhum usuário cadastrado.</td></tr>';
        return;
    }
    
    usersData.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${u.id}</td>
            <td>${u.nome} <br><small style="color:var(--text-muted)">${u.role||'user'}</small></td>
            <td>${u.telefone}</td>
            <td style="font-weight:800; color:var(--green)">R$ ${(u.saldo || 0).toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
            <td></td>
        `;
        // Criar botão com addEventListener (sem onclick inline)
        const btnCell = tr.querySelector('td:last-child');
        const btn = document.createElement('button');
        btn.className = 'btn btn-small btn-cyan';
        btn.textContent = '+ Sld';
        btn.addEventListener('click', () => abrirModalInjetar(u.telefone));
        btnCell.appendChild(btn);
        tbody.appendChild(tr);
    });
}

// ══════════ SAQUES TABLE ══════════
async function loadSaques() {
    const tbody = document.querySelector('#table-saques tbody');
    tbody.innerHTML = '<tr><td colspan="7">Carregando...</td></tr>';
    
    saquesData = await apiRequest('GET', '/saques') || [];
    
    saquesData.sort((a,b) => {
        if (a.status === 'pendente' && b.status !== 'pendente') return -1;
        if (a.status !== 'pendente' && b.status === 'pendente') return 1;
        return new Date(b.data) - new Date(a.data);
    });

    tbody.innerHTML = '';
    
    if (saquesData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted)">Nenhum saque registrado.</td></tr>';
        return;
    }
    
    saquesData.forEach(sq => {
        const d = new Date(sq.data).toLocaleString('pt-BR');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-size:12px; color:var(--text-muted)">${d}</td>
            <td>${sq.nome}</td>
            <td>${sq.telefone}</td>
            <td style="font-family:monospace">${sq.chave_pix}</td>
            <td style="font-weight:800">R$ ${sq.valor.toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
            <td><span class="badge badge-${sq.status}">${sq.status.toUpperCase()}</span></td>
            <td></td>
        `;
        const actionCell = tr.querySelector('td:last-child');
        if (sq.status === 'pendente') {
            const btnAprovar = document.createElement('button');
            btnAprovar.className = 'btn btn-small btn-green';
            btnAprovar.textContent = '✔ Pagou';
            btnAprovar.style.marginRight = '6px';
            btnAprovar.addEventListener('click', () => abrirModalAvaliar(sq.id, 'aprovar'));
            
            const btnRejeitar = document.createElement('button');
            btnRejeitar.className = 'btn btn-small btn-red';
            btnRejeitar.textContent = '✖ Estorno';
            btnRejeitar.addEventListener('click', () => abrirModalAvaliar(sq.id, 'rejeitar'));
            
            actionCell.appendChild(btnAprovar);
            actionCell.appendChild(btnRejeitar);
        }
        tbody.appendChild(tr);
    });
}

// ══════════ MODAL: INJETAR SALDO ══════════
function abrirModalInjetar(telefone) {
    document.getElementById('inj-telefone').value = telefone || '';
    document.getElementById('inj-valor').value = '';
    document.getElementById('inj-status').textContent = '';
    document.getElementById('inj-status').style.color = '';
    document.getElementById('inj-confirmar').disabled = false;
    document.getElementById('inj-confirmar').textContent = '✅ Confirmar Injeção';
    openModal('modal-injetar');
    // Focus no campo certo
    setTimeout(() => {
        if (telefone) {
            document.getElementById('inj-valor').focus();
        } else {
            document.getElementById('inj-telefone').focus();
        }
    }, 100);
}

// Botão "+ Injetar Saldo Manual" (geral, sem telefone)
document.getElementById('btn-injetar-geral').addEventListener('click', () => abrirModalInjetar(''));

// Fechar modal injetar
document.getElementById('close-modal-injetar').addEventListener('click', () => closeModal('modal-injetar'));
document.getElementById('inj-cancelar').addEventListener('click', () => closeModal('modal-injetar'));
document.getElementById('modal-injetar').addEventListener('click', (e) => {
    if (e.target.id === 'modal-injetar') closeModal('modal-injetar');
});

// Confirmar injeção
document.getElementById('inj-confirmar').addEventListener('click', async () => {
    const tel = document.getElementById('inj-telefone').value.trim();
    const valorStr = document.getElementById('inj-valor').value.trim();
    const statusEl = document.getElementById('inj-status');
    const btn = document.getElementById('inj-confirmar');
    
    if (!tel) {
        statusEl.textContent = '⚠️ Informe o telefone do usuário.';
        statusEl.style.color = '#FFB800';
        document.getElementById('inj-telefone').focus();
        return;
    }
    
    const vNum = parseFloat(valorStr.replace(',', '.'));
    if (!valorStr || isNaN(vNum) || vNum <= 0) {
        statusEl.textContent = '⚠️ Informe um valor válido maior que zero.';
        statusEl.style.color = '#FFB800';
        document.getElementById('inj-valor').focus();
        return;
    }
    
    btn.disabled = true;
    btn.textContent = '⏳ Processando...';
    statusEl.textContent = '';
    
    const res = await apiRequest('POST', '/injetar_saldo', { telefone: tel, valor: vNum });
    
    if (res && res.message) {
        statusEl.textContent = `✅ ${res.message} — Saldo: R$ ${res.saldo_atual.toLocaleString('pt-BR', {minimumFractionDigits:2})}`;
        statusEl.style.color = '#00C97A';
        showToast(`Saldo de R$ ${vNum.toFixed(2)} injetado com sucesso!`, 'success');
        
        // Atualiza dados no fundo
        if (document.getElementById('tab-users').classList.contains('active')) loadUsers();
        loadDashboard();
        
        // Fecha modal após 1.5s
        setTimeout(() => closeModal('modal-injetar'), 1500);
    } else {
        btn.disabled = false;
        btn.textContent = '✅ Confirmar Injeção';
    }
});

// Enter nos inputs do modal dispara submit
document.getElementById('inj-valor').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('inj-confirmar').click();
});
document.getElementById('inj-telefone').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('inj-valor').focus();
});

// ══════════ MODAL: AVALIAR SAQUE ══════════
let _avaliarSaqueId = null;
let _avaliarSaqueAcao = null;

function abrirModalAvaliar(id, acao) {
    _avaliarSaqueId = id;
    _avaliarSaqueAcao = acao;
    
    const titulo = document.getElementById('avaliar-titulo');
    const msg = document.getElementById('avaliar-msg');
    const btnConf = document.getElementById('avaliar-confirmar');
    const statusEl = document.getElementById('avaliar-status');
    
    statusEl.textContent = '';
    btnConf.disabled = false;
    
    if (acao === 'aprovar') {
        titulo.textContent = '✅ Aprovar Saque';
        msg.textContent = 'Confirma que o pagamento PIX foi realizado?';
        btnConf.textContent = '✔ Confirmar Pagamento';
        btnConf.className = 'btn btn-green';
    } else {
        titulo.textContent = '❌ Rejeitar / Estornar Saque';
        msg.textContent = 'O valor será devolvido ao saldo do usuário. Tem certeza?';
        btnConf.textContent = '✖ Confirmar Estorno';
        btnConf.className = 'btn btn-red';
    }
    
    openModal('modal-avaliar');
}

document.getElementById('close-modal-avaliar').addEventListener('click', () => closeModal('modal-avaliar'));
document.getElementById('avaliar-cancelar').addEventListener('click', () => closeModal('modal-avaliar'));
document.getElementById('modal-avaliar').addEventListener('click', (e) => {
    if (e.target.id === 'modal-avaliar') closeModal('modal-avaliar');
});

document.getElementById('avaliar-confirmar').addEventListener('click', async () => {
    if (!_avaliarSaqueId || !_avaliarSaqueAcao) return;
    
    const btn = document.getElementById('avaliar-confirmar');
    const statusEl = document.getElementById('avaliar-status');
    btn.disabled = true;
    btn.textContent = '⏳ Processando...';
    
    const res = await apiRequest('POST', '/saques/avaliar', { id: _avaliarSaqueId, acao: _avaliarSaqueAcao });
    
    if (res && res.message) {
        const label = _avaliarSaqueAcao === 'aprovar' ? 'aprovado' : 'rejeitado';
        statusEl.textContent = `✅ Saque ${label} com sucesso!`;
        statusEl.style.color = '#00C97A';
        showToast(`Saque ${label}!`, 'success');
        loadSaques();
        loadDashboard();
        setTimeout(() => closeModal('modal-avaliar'), 1200);
    } else {
        btn.disabled = false;
        btn.textContent = _avaliarSaqueAcao === 'aprovar' ? '✔ Confirmar Pagamento' : '✖ Confirmar Estorno';
    }
    
    _avaliarSaqueId = null;
    _avaliarSaqueAcao = null;
});

// ══════════ INIT ══════════
window.onload = loadDashboard;
