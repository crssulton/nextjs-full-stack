import type { NextApiRequest, NextApiResponse } from "next";
import { PropsDataRes, resError } from "../../../utils/response";
import db from "../../../libs/db";
import { validateUser } from "../users/helper";
import { createAccessToken, createRefreshToken } from "./helper";

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
  const body = req.body;

  try {
    const checkUser = await validateUser(body);
    if (!checkUser) throw new Error("User not exsis!");

    const user = await db("tb_users").where("email", "=", body.email).first();
    const access_token = await createAccessToken(user);
    const refresh_token = await createRefreshToken(user);

    return res.status(200).json({
      access_token,
      refresh_token,
    });
  } catch (error) {
    console.log("error", error);
    resError({ res, data: { message: "Login error!" } });
  }
};
