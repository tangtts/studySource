import Axios from "./core/Axios";
import bind from "./helpers/bind";
import * as utils from "./utils";
import defaults from "./defaults";
function createInstance(defaultConfig: any) {
  // 一个实例对象
  let context = new Axios(defaultConfig);
  // 确定this 指向  context ，毕竟
  /*
    return function wrap() {
      return fn.apply(args, arguments)
   }
  */
  const instance = bind(Axios.prototype.request, context) as any;
  // extend 方法，遍历 Axios.prototype
  // 如果是一个方法，再包装一层 wrap 函数
  utils.extend(instance, Axios.prototype, context, { allOwnKeys: true });
  // 在 wrap 函数上挂载 Axios.prototype
  // 遍历 context , 往 instance 身上加 context 的参数，
  // 也就是 wrap 身上加 constructor 中的参数
  utils.extend(instance, context, null, { allOwnKeys: true });
  return instance;
}

const axios = createInstance(defaults);

console.dir(axios.default)
export { axios };
