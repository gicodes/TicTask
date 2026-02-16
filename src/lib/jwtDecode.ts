import { jwtDecode } from "jwt-decode";

export function getTokenExpiry(token: string) {
  const decoded: any = jwtDecode(token);
  return decoded.exp * 1000;
}
