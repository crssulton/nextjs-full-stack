import type { NextApiRequest, NextApiResponse } from "next";
import { PropsDataRes, resError } from "../../../utils/response";
import db from "../../../libs/db";
import { createAccessToken } from "./helper";
import { decodeToken } from "../../../utils";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) {
  const { method } = req;

  switch (method) {
    case "POST":
      postData(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const postData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { refresh_token } = req.body;

  try {
    const payload: any = decodeToken(refresh_token);
    const refreshToken = await db("tb_refresh_token")
      .where("id", "=", payload.jid)
      .first();

    if (!refreshToken) {
      throw new Error("Refresh token is not found");
    }

    if (refreshToken.isRevoked !== '0') {
      throw new Error("Refresh token has beed revoked");
    }

    const user = await db("tb_users").where("id", "=", refreshToken.userId).first();

    const access_token = await createAccessToken(user);

    return res.status(200).json({
      access_token,
    });
  } catch (error: any) {
    console.log("error", error);
    resError({ res, data: { message: error?.message || "Login error!" } });
  }
};
