import { jwtDecode } from "jwt-decode";
import type { LoginResponse } from "../../../types/auth";

interface JwtPayload {
  iss: string
  sub: string;
  id: number;
  exp: number;
}

export async function login(email: string, senha: string): Promise<string> {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    throw new Error("Login falhou! Verifique suas credenciais.");
  }

  const data: LoginResponse = await response.json();
  localStorage.setItem("token", data.token);

  const decoded = jwtDecode<JwtPayload>(data.token);

  const userId = decoded.id;

  localStorage.setItem("userId", String(userId));

  return data.token;
}