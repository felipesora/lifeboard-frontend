import type { MetaResponse } from "./meta";
import type { TransacaoResponse } from "./transacao";

export interface FinanceiroResponse {
    id_financeiro: number;
    saldo_atual: number;
    salario_mensal: number;
    id_usuario: number;
    transacoes: TransacaoResponse[];
    metas: MetaResponse[];
}

export interface FinanceiroRequest {
    saldo_atual: number;
    salario_mensal: number;
    id_usuario: number;
}