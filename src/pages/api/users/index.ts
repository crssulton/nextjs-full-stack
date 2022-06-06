import type { NextApiRequest, NextApiResponse } from "next";
import { PropsDataRes, resError, resSuccess } from "../../../utils/response";
import db from "../../../libs/db";
import * as bcrypt from "bcrypt";
import { validateUser } from "./helper";
import { verifyAuth } from "../auth/helper";
// import { TokenExpiredError } from 'jsonwebtoken';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) {
  verifyAuth(req, res)
  
  const { method } = req;

  switch (method) {
    case "GET":
      getData(req, res);
      break;
    case "POST":
      postData(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const getData = async (
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const result = await db("tb_users")
      .select()
      .limit(Number(limit))
      .offset(Number(offset));

    const count = await db("tb_users").count("id as count");

    return resSuccess({ res, data: { result, count: count?.[0]?.count } });
  } catch (error) {
    console.log("error", error);
    resError({ res, data: { message: "Get data error!" } });
  }
};

const postData = async (
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) => {
  const body = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(body.password, salt);

    const checkUser = await validateUser(body);
    if (!checkUser) {
      await db("tb_users").insert({
        ...body,
        salt,
        password,
      });
    }

    const result = await db("tb_users").where("email", "=", body.email).first();

    return resSuccess({
      res,
      data: { message: "Create data success!", result },
    });
  } catch (error) {
    console.log("error", error);
    resError({ res, data: { message: "Create data error!" } });
  }
};
