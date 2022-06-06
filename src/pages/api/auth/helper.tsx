import db from "../../../libs/db";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken, resError } from "../../../utils";

export const createAccessToken = async (user: any) => {
  const payload = {
    sub: user.id,
  };

  return jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET || "", {
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

  return jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET || "", { expiresIn });
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
