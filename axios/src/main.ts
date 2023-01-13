
import { axios } from "./axios"
console.dir(axios)
axios.interceptors.request.use((config:any)=>{
  console.log(config)
  return config
})
axios.request("aa",{})

class A {
  name
  constructor(name:string){
    this.name = this.set(name)
  }
  set(name:string){
    return name+'a'
  }
  concat(){
    return this.constructor()
  }
  static c(){
    const computed = new this("name");
    return computed
  }
}
let a = new A("aaa")
console.log(A.c())


export {}