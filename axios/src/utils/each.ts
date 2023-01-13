import { isArray } from ".";

type allOwnKeys = { allOwnKeys:boolean }
type Each<obj extends object,fn extends Function,suffix extends allOwnKeys> = 
 obj extends Array<any> ? (k:number,v:obj[number])=>void : (k:keyof obj,v:any)=>void 

 const arr = <const>['name', 'age', 'location', 'email'];
 export type A = (typeof arr)[number];


/**
 * 
 * @param obj 传进来的对象
 * @param fn 执行的 回调函数 value, index, obj
 * @param  { allOwnKeys = false }
 * @returns void
 */
 const Each = (obj:any, fn:Function, { allOwnKeys = false } = {}):void=>{
  if (obj === null || typeof obj === 'undefined') {
    return;
  }
  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
export default Each