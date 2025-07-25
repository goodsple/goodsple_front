export function maskUserId(userId: string): string {
   if (userId.length <= 4) {
     // 길이가 4 이하인 경우: 앞 1글자 + *들 + 끝 1글자
     const front = userId.slice(0, 1);
     const back = userId.slice(-1);
     const middle = "*".repeat(userId.length - 2);
     return `${front}${middle}${back}`;
   }
 
   const front = userId.slice(0, 2);
   const back = userId.slice(-2);
   const middle = "*".repeat(userId.length - 4);
 
   return `${front}${middle}${back}`;  
 }