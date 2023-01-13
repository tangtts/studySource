import { HTTPStatus } from "./../utils/type";

abstract class AError extends Error {
  message: string = "";
  name: string = "";
  code: HTTPStatus = 200;
  request: any;
  config: any;
  response: any;
}
let descriptors:any = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

class AxiosError extends AError {
  constructor(
    message: any,
    code: any,
    config: any,
    request: any,
    response: any
  ) {
    super();
    this.stack = new Error().stack;
    this.message = message;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }
 static ERR_BAD_REQUEST(){
  return {value: "ERR_BAD_REQUEST"}
  }
  static ERR_BAD_RESPONSE(){
    return {value: "ERR_BAD_RESPONSE"}
  }
  static ETIMEDOUT(){
    return {value: "ETIMEDOUT"}
  }
  
}

export default AxiosError;
