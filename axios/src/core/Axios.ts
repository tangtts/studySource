import InterceptorManager from "./InterceptorManager";
import dispatchRequest from "./dispatchRequest";
class Axios {
  defaults;
  interceptors: any;
  constructor(instanceConfig: any) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      reponse: new InterceptorManager(),
    };
  }
  request(configOrUrl: string | object, config: any = {}) {
    if (typeof configOrUrl == "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl;
    }
    // 合并config
    config = { ...config, ...this.defaults };
    config.method ??= "get";

    const requestInterceptorChain: any = [];
    this.interceptors.request.forEach(function unshiftRequestInterceptors(
      interceptor: any
    ) {
      requestInterceptorChain.unshift(
        interceptor.fulfilled,
        interceptor.rejected
      );
    });

    const responseInterceptorChain: any = [];
    this.interceptors.response.forEach(function pushRequestInterceptors(
      interceptor: any
    ) {
      responseInterceptorChain.push(
        interceptor.fulfilled,
        interceptor.rejected
      );
    });

    let promise;
    let i = 0;
    let len;
    let newConfig = config;

    len = requestInterceptorChain.length;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (e) {
        onRejected.call(this, e);
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(
        responseInterceptorChain[i++],
        responseInterceptorChain[i++]
      );
    }
    console.log(configOrUrl, config);

    return promise;
  }
  getUri() {
    console.log("getUri");
  }
}
export default Axios;
