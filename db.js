require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey && supabaseUrl.startsWith('https://'));

let supabase = null;
if (isSupabaseConfigured) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ [BANCO DE DADOS] Conectado com sucesso ao Supabase (PostgreSQL)!');
} else {
    console.log('⚠️ [BANCO DE DADOS] Supabase não configurado no .env. Operando em modo de memória temporária.');
}

// Fallback de memória caso Supabase não esteja configurado
let memoryUsers = [{
    id: 1,
    telefone: 'cesar123',
    senha: 'cesar123',
    nome: 'Diretor Cesar',
    cpf: '00000000000',
    saldo: 1000.00,
    chave_pix: '',
    role: 'admin'
}];
let memorySaques = [];

// Funções utilitárias de senha
async function hashPassword(plainPassword) {
    return await bcrypt.hash(plainPassword, 10);
}

async function comparePassword(plainPassword, storedPassword) {
    if (!storedPassword) return false;
    // Se a senha estiver salva em texto puro (legado ou teste)
    if (plainPassword === storedPassword) return true;
    try {
        return await bcrypt.compare(plainPassword, storedPassword);
    } catch {
        return false;
    }
}

// ================= Métodos de Usuários =================

async function findUserByTelefone(telefone) {
    if (!telefone) return null;
    const cleanTel = telefone.trim();
    if (isSupabaseConfigured) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('telefone', cleanTel)
            .maybeSingle();
        if (error) {
            console.error('Erro ao buscar usuário por telefone no Supabase:', error.message);
            return null;
        }
        if (data) data.saldo = parseFloat(data.saldo || 0);
        return data;
    } else {
        return memoryUsers.find(u => u.telefone === cleanTel) || null;
    }
}

async function findUserById(id) {
    if (id === undefined || id === null) return null;
    const numId = Number(id);
    if (isSupabaseConfigured) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', numId)
            .maybeSingle();
        if (error) {
            console.error('Erro ao buscar usuário por ID no Supabase:', error.message);
            return null;
        }
        if (data) data.saldo = parseFloat(data.saldo || 0);
        return data;
    } else {
        return memoryUsers.find(u => u.id === numId) || null;
    }
}

async function createUser({ telefone, senha, nome, cpf, role = 'user' }) {
    const hashedPassword = await hashPassword(senha);
    const cleanTel = telefone.trim();

    if (isSupabaseConfigured) {
        const { data, error } = await supabase
            .from('users')
            .insert([{
                telefone: cleanTel,
                senha: hashedPassword,
                nome: nome || '',
                cpf: cpf || '',
                saldo: 0.00,
                chave_pix: '',
                role: role || 'user'
            }])
            .select()
            .single();

        if (error) throw new Error(error.message);
        if (data) data.saldo = parseFloat(data.saldo || 0);
        return data;
    } else {
        const newUser = {
            id: memoryUsers.length + 1,
            telefone: cleanTel,
            senha: hashedPassword,
            nome: nome || '',
            cpf: cpf || '',
            saldo: 0,
            chave_pix: '',
            role: role || 'user'
        };
        memoryUsers.push(newUser);
        return newUser;
    }
}

async function updateUser(id, updates) {
    const numId = Number(id);
    if (updates.senha) {
        updates.senha = await hashPassword(updates.senha);
    }
    if (updates.saldo !== undefined) {
        updates.saldo = parseFloat(updates.saldo);
    }

    if (isSupabaseConfigured) {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', numId)
            .select()
            .single();
        if (error) throw new Error(error.message);
        if (data) data.saldo = parseFloat(data.saldo || 0);
        return data;
    } else {
        const user = memoryUsers.find(u => u.id === numId);
        if (!user) return null;
        Object.assign(user, updates);
        return user;
    }
}

async function getAllUsers() {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase
            .from('users')
            .select('id, telefone, nome, cpf, saldo, chave_pix, role, created_at')
            .order('id', { ascending: true });
        if (error) throw new Error(error.message);
        return (data || []).map(u => ({ ...u, saldo: parseFloat(u.saldo || 0) }));
    } else {
        return memoryUsers.map(u => {
            const { senha, ...safeUser } = u;
            return safeUser;
        });
    }
}

// ================= Métodos de Saques =================

async function createSaque(saqueData) {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase
            .from('saques')
            .insert([saqueData])
            .select()
            .single();
        if (error) throw new Error(error.message);
        return data;
    } else {
        memorySaques.push(saqueData);
        return saqueData;
    }
}

async function getSaques() {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase
            .from('saques')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw new Error(error.message);
        return data || [];
    } else {
        return memorySaques;
    }
}

async function findSaqueById(id) {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase
            .from('saques')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (error) throw new Error(error.message);
        return data;
    } else {
        return memorySaques.find(s => s.id === id) || null;
    }
}

async function updateSaque(id, updates) {
    if (isSupabaseConfigured) {
        const { data, error } = await supabase
            .from('saques')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw new Error(error.message);
        return data;
    } else {
        const sq = memorySaques.find(s => s.id === id);
        if (!sq) return null;
        Object.assign(sq, updates);
        return sq;
    }
}

module.exports = {
    isSupabaseConfigured,
    comparePassword,
    hashPassword,
    findUserByTelefone,
    findUserById,
    createUser,
    updateUser,
    getAllUsers,
    createSaque,
    getSaques,
    findSaqueById,
    updateSaque
};
