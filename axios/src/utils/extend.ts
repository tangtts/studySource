import bind from "../helpers/bind";
import each from "./each";

const extend = (a:any, b:object, thisArg:any,{allOwnKeys}:{allOwnKeys:boolean} = {allOwnKeys:false}) => {
  each(b, (val:any, key:any) => {
    if (thisArg && typeof(val) == "function") {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
}
export default extend