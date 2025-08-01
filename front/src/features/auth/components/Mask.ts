export function maskUserId(userId?: string): string {
  // userId가 없으면 빈 문자열 반환
  if (!userId) {
    return "";
  }

  const len = userId.length;

  if (len <= 4) {
    // 길이가 4 이하인 경우: 앞1글자 + '*'들 + 끝1글자
    const front = userId.slice(0, 1);
    const back  = userId.slice(-1);
    const middle = "*".repeat(len - 2);
    return `${front}${middle}${back}`;
  }

  // 길이가 5 이상인 경우: 앞2글자 + '*'들 + 끝2글자
  const front = userId.slice(0, 2);
  const back  = userId.slice(-2);
  const middle = "*".repeat(len - 4);
  return `${front}${middle}${back}`;
}
