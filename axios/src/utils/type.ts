export type HTTPStatus = 100 | 200 | 300 | 400 | 500
export type Method =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK';

export type MethodsHeaders = {
  [Key in Method as Lowercase<Key>]: Function;
};

export const isArray = (arg:unknown)=>{
  return Array.isArray(arg)
}