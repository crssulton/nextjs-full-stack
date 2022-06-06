import db from "../../../libs/db";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { resError } from "../../../utils";

export const createAccessToken = async (user: any) => {
  const payload = {
    sub: user.id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: 60 * 60,
  });
};

export const createRefreshToken = async (user: any) => {
  const expiresIn = 60 * 60 * 24;

  const expiredAt = new Date();
  expiredAt.setTime(expiredAt.getTime() + expiresIn * 1000);

  const jid = await db("tb_refresh_token").insert({
    expiredAt: expiredAt.getTime().toString(),
    userId: user.id,
    isRevoked: 0,
  });

  const payload = {
    jid: jid[0],
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn });
};

export const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "");
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new Error("Refresh token is expired");
    } else {
      throw new Error("Failed to decode token");
    }
  }
};

export const verifyAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authorization = "" } = req.headers;
    const split = authorization.split(" ")[1];
    return decodeToken(split);
  } catch (error) {
    return resError({
      res,
      data: { message: "Unauthorized!" },
      statusCode: 401,
    });
  }
};
