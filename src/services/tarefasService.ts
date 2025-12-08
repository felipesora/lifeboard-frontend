import type { TarefaEditDTO } from "../types/tarefa";


export async function obterDadosTarefa(id) {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/tarefas/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao obter os dados da tarefa.');
    }

    return await response.json();
}

export async function cadastrarTarefa(tarefa) {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('userId');

    const response = await fetch('http://localhost:8080/api/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
            prioridade: tarefa.prioridade,
            status: tarefa.status,
            data_limite: tarefa.data_limite,
            id_usuario: idUser
        }),
    });

    if (!response.ok) {
        const erro = await response.text();
        throw new Error(`Cadastro de tarefa! ${erro}`);
    }

    return await response.json();
}

export async function editarDadosTarefa(idTarefa: number, novaTarefa: TarefaEditDTO): Promise<void> {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('userId');

    const response = await fetch(`http://localhost:8080/api/tarefas/${idTarefa}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titulo: novaTarefa.titulo,
            descricao: novaTarefa.descricao,
            prioridade: novaTarefa.prioridade,
            status: novaTarefa.status,
            data_limite: novaTarefa.data_limite,
            id_usuario: idUser
        })
    });

    if (!response.ok) {
        throw new Error('Erro ao editar os dados da tarefa.');
    }

    return await response.json();
}

export async function deletarTarefa(idTarefa: number): Promise<void> {
        const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/tarefas/${idTarefa}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao deletar tarefa.');
    }

    return;
}