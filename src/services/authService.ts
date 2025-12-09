import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  iss: string
  sub: string;
  id: number;
  exp: number;
}

export function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return false;
  }
}