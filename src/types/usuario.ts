import type { FinanceiroResponse } from "./financeiro";
import type { TarefaResponse } from "./tarefa";

export interface UsuarioResponse {
    id_usuario: number;
    nome: string;
    email: string;
    senha: string;
    financeiro: FinanceiroResponse;
    tarefas: TarefaResponse[];
}

export interface UsuarioEditRequest {
  nome: string;
  email: string;
  senha: string;
}