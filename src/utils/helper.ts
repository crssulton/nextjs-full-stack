import { getCookie, setCookies, removeCookies } from "cookies-next";
import jwt, { TokenExpiredError } from "jsonwebtoken";

type AuthProps = {
  access_token: string;
  refresh_token: string;
};

export const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || "");
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new Error("Refresh token is expired");
    } else {
      throw new Error("Failed to decode token");
    }
  }
};

export const getToken = (cookies?: any) => {
  let cookie = getCookie(process.env.NEXT_PUBLIC_JWT_NAME || "");
  if(cookies) cookie = cookies?.[process.env.NEXT_PUBLIC_JWT_SECRET || ""]

  try {
    return JSON.parse(cookie?.toString() || "");
  } catch (error) {
    return { access_token: "", refresh_token: "" };
  }
};

export const isLogin = () => {
  try {
    const { access_token = "" }: AuthProps = getToken();

    return decodeToken(access_token);
  } catch (error) {
    return false;
  }
};

export const setLogin = (body: AuthProps) => {
  setCookies(process.env.NEXT_PUBLIC_JWT_NAME || "", JSON.stringify(body));
};

export const logout = () => {
  removeCookies(process.env.NEXT_PUBLIC_JWT_NAME || "");
};
