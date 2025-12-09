import type { RegisterRequest } from "../../../types/auth";

export async function cadastro({ nome, email, senha }: RegisterRequest) {
    const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
        }),
    });

    if (!response.ok) {
        const erro = await response.text();
        throw new Error(`Cadastro falhou! ${erro}`);
    }

    return await response.json();
}