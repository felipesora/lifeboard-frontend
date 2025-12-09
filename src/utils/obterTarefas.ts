import { obterDadosUsuario } from "../services/usuarioService";

export async function obterTarefas() {
    const idUser = localStorage.getItem('userId');

    if (!idUser) {
        throw new Error('Usuário não logado!');
    }

    const usuario = await obterDadosUsuario(Number(idUser));

    return usuario.tarefas ?? [];
}