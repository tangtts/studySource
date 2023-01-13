import Each from "./each";

function merge(){
  const result = {};
 function assignValue(val:any, key:any){
   
 }
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && Each(arguments[i], assignValue);
  }
  return result;
}
export {
  merge
};