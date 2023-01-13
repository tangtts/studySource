import { HTTPStatus } from "../utils/type";
import * as utils from "../utils";

const DEFAULT_CONTENT_TYPE = {
  "Content-Type": undefined,
};

const defaults = {
  timeout: 0,
  transformRequest: [
    function transformRequest(data: any, headers: any) {
      console.log("request", data);
      return data;
    },
  ],
  transformResponse: [
    function transformResponse(data: any) {
      console.log("response", data);
      return data;
    },
  ],
  validateStatus: function validateStatus(status: HTTPStatus) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
    },
  } as any,
};

utils.each(
  ["delete", "get", "head"],
  function forEachMethodNoData(method: string) {
    defaults.headers[method] = {};
  }
);

utils.each(
  ["post", "put", "patch"],
  function forEachMethodWithData(method: string) {
    defaults.headers[method] = DEFAULT_CONTENT_TYPE;
  }
);

export default defaults
