import type { FinanceiroRequest } from "../../../types/financeiro";

export async function editarFinanceiroUsuario(idFinanceiro: number, financeiro: FinanceiroRequest): Promise<void> {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/financeiros/${idFinanceiro}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            saldo_atual: financeiro.saldo_atual,
            salario_mensal: financeiro.salario_mensal,
            id_usuario: financeiro.id_usuario,
        })
    });

    if (!response.ok) {
        throw new Error('Erro ao editar os dados do financeiro.');
    }

    return await response.json();
}