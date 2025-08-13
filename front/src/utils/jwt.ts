// 액세스 토큰(JWT) 안에 들어있는 role 클레임을 안전하게 꺼내는 작은 유틸 함수
// JWT의 payload에서 role 클레임만 안전하게 뽑아오기
export function decodeJwtRole(token: string | null | undefined): string | undefined {
    if (!token) return;
    try {
      const base64Url = token.split('.')[1] ?? '';
      const base64 = base64Url
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        + '='.repeat((4 - (base64Url.length % 4)) % 4); // 패딩 보정
      const payload = JSON.parse(atob(base64));
      return payload?.role; // 서버에서 넣어준 role 클레임
    } catch {
      return;
    }
}