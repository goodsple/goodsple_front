import JwtDecode from "jwt-decode";

interface JwtPayload {
  sub: string; // userId
  role?: string;
  iat?: number;
  exp?: number;
}

export function getMyUserIdFromToken(): number | null {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const decoded = JwtDecode<JwtPayload>(token);
    const id = Number(decoded.sub);
    return Number.isFinite(id) ? id : null;
  } catch {
    return null;
  }
}

export function getMyRoleFromToken(): string | undefined {
  const token = localStorage.getItem("accessToken");
  if (!token) return undefined;
  try {
    const decoded = JwtDecode<JwtPayload>(token);
    return decoded.role;
  } catch {
    return undefined;
  }
}
