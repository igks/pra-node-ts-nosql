export function debug(payload: any){
  if(process.env.USE_DEBUGGER === 'true'){
    console.log(payload);
  }
}