import type { UsuarioEditRequest, UsuarioResponse } from "../types/usuario";

export async function obterDadosUsuario(id: number): Promise<UsuarioResponse> {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/";
        throw new Error("Token expirado ou inválido.");
    }

    if (!response.ok) {
        throw new Error('Erro ao obter os dados do usuário.');
    }

    return await response.json();
}

export async function editarDadosUsuario(idUsuario: number, novoUsuario: UsuarioEditRequest): Promise<void> {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/usuarios/${idUsuario}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: novoUsuario.nome,
            email: novoUsuario.email,
            senha: novoUsuario.senha,
        })
    });

    if (!response.ok) {
        throw new Error('Erro ao editar os dados do usuário.');
    }

    return await response.json();
}

export async function deletarUsuario(id: number): Promise<void> {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao deletar conta.');
    }

    return;
}

export async function obterFotoPerfil(): Promise<Blob> {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('userId');

    const response = await fetch(`http://localhost:8080/api/usuarios/${idUser}/foto`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    const blob = await response.blob();

    if (!response.ok) {
        throw new Error('Erro ao obter foto de perfil.');
    }

    return blob;
}

export async function atualizarFotoPefil(formData: FormData): Promise<Blob> {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('userId');

    const response = await fetch(`http://localhost:8080/api/usuarios/${idUser}/foto`, {
        method: 'PUT',
        body: formData,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    const blob = await response.blob();

    if (!response.ok) {
        throw new Error('Erro ao atualizar foto de perfil.');
    }

    return blob;
}

export async function removerFotoPerfil(): Promise<void> {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('userId');

    const response = await fetch(`http://localhost:8080/api/usuarios/${idUser}/foto`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao remover foto de perfil.');
    }

    return;
}