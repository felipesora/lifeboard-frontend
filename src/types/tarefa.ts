export interface TarefaResponse {
    id_tarefa: number;
    titulo: string;
    descricao: string;
    data_limite: string;
    prioridade: "BAIXA" | "MEDIA" | "ALTA";
    status: "A_FAZER" | "EM_ANDAMENTO" | "CONCLUIDA";
    id_usuario: number;
}

export interface TarefaCreateDTO {
    titulo: string;
    descricao: string;
    data_limite: string;
    prioridade: "BAIXA" | "MEDIA" | "ALTA";
    status: "A_FAZER" | "EM_ANDAMENTO" | "CONCLUIDA";
    id_usuario: number;
}

export interface TarefaEditDTO {
    titulo: string;
    descricao: string;
    data_limite: string;
    prioridade: "BAIXA" | "MEDIA" | "ALTA";
    status: "A_FAZER" | "EM_ANDAMENTO" | "CONCLUIDA";
    id_usuario: number;
}