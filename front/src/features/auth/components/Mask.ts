export function maskUserId(userId:string){
   const front = userId.slice(0,2);
   const back = userId.slice(-2);
   const middle = "*".repeat(userId.length - 4);

   return `${front}${back}${middle}`
}