export interface TransacaoResponse {
  id_transacao: number;
  descricao: string;
  valor: number;
  tipo: "ENTRADA" | "SAIDA" | "APLICACAO" | "RESGATE";
  data: string;
  categoria: "ALIMENTACAO" | "TRANSPORTE" | "LAZER" | "SAUDE" | "MORADIA" | "SALARIO" | "INVESTIMENTO" | "OUTROS";
  id_financeiro: number;
}

export interface TransacaoCreateDTO {
  descricao: string;
  valor: number;
  tipo: "ENTRADA" | "SAIDA" | "APLICACAO" | "RESGATE";
  categoria: "ALIMENTACAO" | "TRANSPORTE" | "LAZER" | "SAUDE" | "MORADIA" | "SALARIO" | "INVESTIMENTO" | "OUTROS";
}

export interface TransacaoRequest extends TransacaoCreateDTO {
  id_financeiro: number;
}