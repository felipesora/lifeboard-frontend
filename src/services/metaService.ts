import type { MetaCreateDTO, MetaEditDTO, MetaResponse } from "../types/meta";
import { obterDadosUsuario } from "./usuarioService";

export async function obterDadosMeta(id: number): Promise<MetaResponse> {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/metas/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao obter os dados da meta.');
    }

    return await response.json();
}

export async function cadastrarMeta(meta: MetaCreateDTO): Promise<void> {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('userId');

    const usuario = await obterDadosUsuario(Number(idUser));

    const idFinanceiro = usuario.financeiro.id_financeiro;

    const response = await fetch('http://localhost:8080/api/metas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            nome: meta.nome,
            valor_meta: meta.valor_meta,
            valor_atual: meta.valor_atual,
            data_limite: meta.data_limite,
            id_financeiro: idFinanceiro
        }),
    });

    if (!response.ok) {
        const erro = await response.text();
        throw new Error(`Cadastro de meta! ${erro}`);
    }

    return await response.json();
}

export async function adicionarSaldo(id: number, valor: number): Promise<void> {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/metas/${id}/adicionar-saldo`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            valor: valor
        })
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw {
            status: response.status,
            data
        };
    }

    return;
}

export async function retirarSaldo(id: number, valor: number): Promise<void> {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/metas/${id}/retirar-saldo`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            valor: valor
        })
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw {
            status: response.status,
            data
        };
    }

    return;
}

export async function editarDadosMeta(idMeta: number, novaMeta: MetaEditDTO): Promise<void> {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/metas/${idMeta}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: novaMeta.nome,
            valor_meta: novaMeta.valor_meta,
            data_limite: novaMeta.data_limite,
            id_financeiro: novaMeta.id_financeiro
        })
    });

    if (!response.ok) {
        throw new Error('Erro ao editar os dados da meta.');
    }

    return await response.json();
}

export async function deletarMeta(idMeta: number): Promise<void> {
        const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/metas/${idMeta}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao deletar meta.');
    }

    return;
}