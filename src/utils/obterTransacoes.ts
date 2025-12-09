import { obterDadosUsuario } from "../services/usuarioService";
import type { TransacaoResponse } from "../types/transacao";

export async function obterTransacoes(): Promise<TransacaoResponse[]> {
    const idUser = localStorage.getItem('userId');

    if (!idUser) {
        throw new Error('Usuário não logado!');
    }

    const usuario = await obterDadosUsuario(Number(idUser));

    return usuario.financeiro?.transacoes || [];
}