
import adapter from "./adapter"
export default function dispatchRequest(config:any){
return adapter(config).then((response:any) => {
  return response
}).catch((err) => {
  
});
}