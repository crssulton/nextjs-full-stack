import type { NextApiRequest, NextApiResponse } from "next";
import { PropsDataRes, resError, resSuccess } from "../../../utils/response";
// import data from "../../../../__mocks__/payment-type";
import db from "../../../libs/db";
import { verifyAuth } from "../auth/helper";

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
    case "PUT":
      putData(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const getData = async (
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) => {
  const { limit = 10, offset = 0 } = req.query;
  try {
    const result = await db("tb_payments_type")
      .select()
      .limit(Number(limit))
      .offset(Number(offset));
    const count = await db("tb_payments_type").count("id as count");
    return resSuccess({ res, data: { result, count: count?.[0]?.count } });
  } catch (error) {
    console.log("error", error);
    resError({ res, data: { message: "Get data error!", result: [] } });
  }
};

const postData = async (
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) => {
  const body = req.body;

  try {
    const id = await db("tb_payments_type").insert(body);
    const result = await db("tb_payments_type").where("id", "=", id).first();
    const count = await db("tb_payments_type").count("id as count");

    return resSuccess({
      res,
      data: {
        message: "Create data success!",
        result,
        count: count?.[0]?.count,
      },
    });
  } catch (error) {
    console.log("error", error);
    resError({ res, data: { message: "Create data error!" } });
  }
};

const putData = async (
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) => {
  const { id, ...body } = req.body;

  try {
    await db("tb_payments_type").where("id", "=", id).update(body);
    const result = await db("tb_payments_type").where("id", "=", id).first();
    const count = await db("tb_payments_type").count("id as count");

    return resSuccess({
      res,
      data: { message: "Edit data success!", result, count: count?.[0]?.count },
    });
  } catch (error) {
    console.log("error", error);
    resError({ res, data: { message: "Edit data error!" } });
  }
};
