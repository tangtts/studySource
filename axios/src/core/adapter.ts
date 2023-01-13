import buildFullPath from "../utils/buildFullPath";
import AxiosError from "./AxiosError";
import settle from "./settle";

export default function adapter(config: any) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;

    let onCanceled: any;
    function done() {
      if (config.signal) {
        config.signal.removeEventListener("abort", onCanceled);
      }
    }

    let request: XMLHttpRequest = new XMLHttpRequest();
    const fullPath = buildFullPath(config.baseURL, config.url);
    // request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
    request.timeout = config.timeout;
    function onloadend() {
      const responseType = config.responseType;
      // 判断 设置 中的 responseType 类型
      const responseData =
        !responseType || responseType === "text" || responseType === "json"
          ? request.responseText
          : request.response;

      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: Array.from(request.getAllResponseHeaders()),
        config,
        request,
      };

      // 进行格式转换
      settle(
        function _resolve(value: any) {
          resolve(value);
          done();
        },
        function _reject(err: any) {
          reject(err);
          done();
        },
        response
      );
    }

    request.onloadend = onloadend;
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout
        ? "timeout of " + config.timeout + "ms exceeded"
        : "timeout exceeded";
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(
        new AxiosError(
          timeoutErrorMessage,
          AxiosError.ETIMEDOUT,
          config,
          request,
          this.response
        )
      );

      // Clean up request
    };

    
  });
}
