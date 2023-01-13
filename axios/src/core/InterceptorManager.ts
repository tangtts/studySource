class InterceptorManager {
  handlers:Array<any>
  constructor() {
    this.handlers = [];
  }

  use(fulfilled:any, rejected:any) {
    this.handlers.push({
      fulfilled,
      rejected,
    });
    return this.handlers.length - 1;
  }
  forEach(fn:Function) {
    this.handlers.forEach(h=>{
      fn(h)
    })
  }
}

export default InterceptorManager;