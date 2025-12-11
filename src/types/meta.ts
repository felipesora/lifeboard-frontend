export interface MetaResponse {
    id_meta: number;
    nome: string;
    valor_meta: number;
    valor_atual: number;
    status: "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA";
    data_limite: string;
    id_financeiro: number;
}

export interface MetaCreateDTO {
    nome: string;
    valor_meta: number;
    valor_atual: number;
    data_limite: string;
}

export interface MetaEditDTO {
    nome: string;
    valor_meta: number;
    data_limite: string;
    id_financeiro: number;
    status: "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA";
}