import API from "./requestAPI";
import { PropsDataRes, resError, resSuccess } from "./response";
import { decodeToken, isLogin, setLogin, getToken, logout } from "./helper";

export {
  API,
  resError,
  resSuccess,
  decodeToken,
  isLogin,
  setLogin,
  getToken,
  logout,
};
export type { PropsDataRes };
