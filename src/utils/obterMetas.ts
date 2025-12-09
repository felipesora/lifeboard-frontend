import { obterDadosUsuario } from "../services/usuarioService";
import type { MetaResponse } from "../types/meta";

export async function obterMetas(): Promise<MetaResponse[]> {
    const idUser = localStorage.getItem('userId');

    if (!idUser) {
        throw new Error('Usuário não logado!');
    }

    const usuario = await obterDadosUsuario(Number(idUser));

    return usuario.financeiro?.metas || [];
}