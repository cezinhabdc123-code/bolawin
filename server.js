require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const serverless = require('serverless-http');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Servindo a pasta public com o Clone Front-end
app.use(express.static(path.join(__dirname, 'public')));

const SECRET = process.env.JWT_SECRET || 'jwt_secret_dev';

// ============= Middlewares de Autenticação =============
async function authMid(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Nenhum token fornecido.' });
    
    jwt.verify(token, SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido ou expirado.' });
        try {
            const user = await db.findUserById(decoded.userId);
            if (!user) return res.status(401).json({ error: 'Usuário não encontrado.' });
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({ error: 'Erro interno ao validar sessão.' });
        }
    });
}

async function authAdminMid(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Nenhum token fornecido.' });
    
    jwt.verify(token, SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido.' });
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado. Área restrita a Administradores.' });
        }
        try {
            const user = await db.findUserById(decoded.userId);
            if (!user || user.role !== 'admin') {
                return res.status(403).json({ error: 'Acesso negado. Usuário não é administrador.' });
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({ error: 'Erro interno ao validar privilégios.' });
        }
    });
}

// ============= Rotas de Autenticação =============
app.post('/api/auth/register', async (req, res) => {
    try {
        const { telefone, senha, nome, cpf } = req.body;
        if (!telefone || !senha) {
            return res.status(400).json({ error: 'Telefone e senha são obrigatórios.' });
        }

        const existing = await db.findUserByTelefone(telefone);
        if (existing) {
            return res.status(400).json({ error: 'Telefone já cadastrado!' });
        }

        const newUser = await db.createUser({ telefone, senha, nome, cpf, role: 'user' });
        const token = jwt.sign({ userId: newUser.id, role: 'user' }, SECRET, { expiresIn: '8h' });
        
        const { senha: _, ...safeUser } = newUser;
        res.json({ token, user: safeUser });
    } catch (error) {
        console.error('[ERRO REGISTER]:', error.message);
        res.status(500).json({ error: 'Erro ao cadastrar usuário: ' + error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { telefone, senha } = req.body;
        if (!telefone || !senha) {
            return res.status(400).json({ error: 'Informe telefone e senha.' });
        }

        const user = await db.findUserByTelefone(telefone);
        if (!user) {
            return res.status(401).json({ error: 'Telefone ou senha inválidos' });
        }
        
        const passwordMatch = await db.comparePassword(senha, user.senha);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Telefone ou senha inválidos' });
        }
        
        const token = jwt.sign({ userId: user.id, role: user.role || 'user' }, SECRET, { expiresIn: '8h' });
        const { senha: _, ...safeUser } = user;
        res.json({ token, user: safeUser });
    } catch (error) {
        console.error('[ERRO LOGIN]:', error.message);
        res.status(500).json({ error: 'Erro ao realizar login.' });
    }
});

app.get('/api/auth/me', authMid, (req, res) => {
    const { senha: _, ...safeUser } = req.user;
    res.json({ user: safeUser });
});

// ============= Rotas do Usuário =============
app.get('/api/user/dashboard', authMid, (req, res) => {
    res.json({ 
        saldo: parseFloat(req.user.saldo || 0), 
        historico: [], 
        nome: req.user.nome || req.user.telefone 
    });
});

app.put('/api/user/pix', authMid, async (req, res) => {
    try {
        const chave_pix = req.body.chave_pix || '';
        await db.updateUser(req.user.id, { chave_pix });
        res.json({ message: 'Chave PIX salva com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar chave PIX.' });
    }
});

app.put('/api/user/senha', authMid, async (req, res) => {
    try {
        const { senha_atual, senha_nova } = req.body;
        const isMatch = await db.comparePassword(senha_atual, req.user.senha);
        if (!isMatch) {
            return res.status(400).json({ error: 'Senha atual incorreta.' });
        }
        await db.updateUser(req.user.id, { senha: senha_nova });
        res.json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar senha.' });
    }
});

// ============= Financeiro =============
app.get('/api/user/deposito-info', authMid, (req, res) => { 
    res.json({ habilitado: true }); 
});

app.post('/api/financeiro/deposito', authMid, (req, res) => {
    const valor = parseFloat(req.body.valor);
    const txid = `simulado-${Date.now()}`;
    res.json({ txid, qr_code_base64: '', copia_cola: '000000000_SIMULADO' });
});

app.get('/api/financeiro/deposito/status/:txid', authMid, (req, res) => {
    res.json({ status: 'CONCLUIDO' });
});

app.post('/api/financeiro/saque', authMid, async (req, res) => {
    try {
        const valor = parseFloat(req.body.valor);
        if (isNaN(valor) || valor <= 0) {
            return res.status(400).json({ error: 'Valor de saque inválido.' });
        }
        
        const chave_pix = req.body.chave_pix || req.user.chave_pix || req.body.cpf;
        if (!chave_pix) {
            return res.status(400).json({ error: 'Chave PIX não informada.' });
        }

        if (req.user.saldo < valor) {
            return res.status(400).json({ error: 'Saldo insuficiente!' });
        }

        // Debita do saldo
        const novoSaldo = req.user.saldo - valor;
        await db.updateUser(req.user.id, { saldo: novoSaldo });

        await db.createSaque({
            id: `sq-${Date.now()}`,
            user_id: req.user.id,
            nome: req.user.nome || 'Sem Nome',
            telefone: req.user.telefone,
            valor: valor,
            chave_pix: chave_pix,
            status: 'pendente'
        });

        res.json({ message: 'Saque solicitado com sucesso! Em análise.' });
    } catch (error) {
        console.error('[ERRO SAQUE]:', error.message);
        res.status(500).json({ error: 'Erro ao processar saque: ' + error.message });
    }
});

// ============= JOGO (Engine Principal) =============
let partidas = {};

app.get('/api/game/configs', authMid, (req, res) => {
    res.json({ min_aposta: 1.0, max_aposta: 500.0 });
});

app.post('/api/game/iniciar', authMid, async (req, res) => {
    try {
        const { valor_entrada, multiplicador_meta } = req.body;
        const vEntrada = parseFloat(valor_entrada);

        if (req.user.saldo < vEntrada) {
            return res.status(400).json({ error: 'Saldo insuficiente' });
        }
        
        const novoSaldo = req.user.saldo - vEntrada;
        await db.updateUser(req.user.id, { saldo: novoSaldo });
        
        const partida_id = `match-${Date.now()}`;
        partidas[partida_id] = { user_id: req.user.id, valor_entrada: vEntrada, multiplicador_meta };
        
        res.json({ partida_id, saldo_atual: novoSaldo });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao iniciar partida.' });
    }
});

app.post('/api/game/finalizar', authMid, async (req, res) => {
    try {
        const { partida_id, resgatou } = req.body;
        const p = partidas[partida_id];

        if (!p || p.user_id !== req.user.id) {
            return res.status(400).json({ error: 'Partida inválida' });
        }

        let retorno = 0;
        let novoSaldo = req.user.saldo;
        if (resgatou) {
            retorno = p.valor_entrada * p.multiplicador_meta;
            novoSaldo = req.user.saldo + retorno;
            await db.updateUser(req.user.id, { saldo: novoSaldo });
        }

        delete partidas[partida_id];

        res.json({ 
            sucesso: true, 
            saldo_atual: novoSaldo, 
            ganhou: resgatou, 
            retorno 
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao finalizar partida.' });
    }
});

// ============= PAINEL ADMINISTRADOR =============
app.get('/api/admin/users', authAdminMid, async (req, res) => {
    try {
        const allUsers = await db.getAllUsers();
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar usuários.' });
    }
});

app.get('/api/admin/saques', authAdminMid, async (req, res) => {
    try {
        const saques = await db.getSaques();
        res.json(saques);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar saques.' });
    }
});

app.post('/api/admin/saques/avaliar', authAdminMid, async (req, res) => {
    try {
        const { id, acao } = req.body; // acao: 'aprovar' ou 'rejeitar'
        const sq = await db.findSaqueById(id);
        if (!sq) return res.status(404).json({ error: 'Saque não encontrado.' });
        if (sq.status !== 'pendente') return res.status(400).json({ error: 'Saque já processado anteriormente.' });

        if (acao === 'aprovar') {
            await db.updateSaque(id, { status: 'aprovado' });
        } else if (acao === 'rejeitar') {
            await db.updateSaque(id, { status: 'rejeitado' });
            const user = await db.findUserById(sq.user_id);
            if (user) {
                const estorno = user.saldo + parseFloat(sq.valor);
                await db.updateUser(user.id, { saldo: estorno });
            }
        }
        
        res.json({ message: `Saque ${acao} com sucesso.` });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao avaliar saque.' });
    }
});

app.post('/api/admin/injetar_saldo', authAdminMid, async (req, res) => {
    try {
        let { telefone, valor } = req.body;
        if (!telefone) return res.status(400).json({ error: 'Telefone do usuário é obrigatório.' });
        if (valor === undefined || valor === null || isNaN(parseFloat(valor))) {
            return res.status(400).json({ error: 'Valor numérico inválido.' });
        }
        
        const user = await db.findUserByTelefone(telefone);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado por este telefone.' });
        
        const vNum = parseFloat(valor);
        const novoSaldo = user.saldo + vNum;
        await db.updateUser(user.id, { saldo: novoSaldo });

        console.log(`[ADMIN] Injeção de Saldo: R$${vNum} para ${telefone}. Saldo atual: ${novoSaldo}`);
        res.json({ message: 'Saldo creditado com sucesso.', saldo_atual: novoSaldo });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao injetar saldo: ' + error.message });
    }
});

// ============= CONFIGURAÇÕES PÚBLICAS =============
app.get('/api/public/config', (req, res) => {
    res.json({
        site_nome: 'BolaWin',
        min_deposito: 20.0,
        min_saque: 50.0,
        suporte_telegram: 'https://t.me/seu_suporte',
        demo_mode: true,
        registro_aberto: true,
        cores: {
            cor_pink: '#FF6B9D',
            cor_purple: '#9333EA',
            cor_green: '#00C97A'
        }
    });
});

const port = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Servidor rodando localmente em: http://localhost:${port}`);
    });
}

module.exports = app;
module.exports.handler = serverless(app);
