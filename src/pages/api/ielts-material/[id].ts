import type { NextApiRequest, NextApiResponse } from "next";
import { PropsDataRes, resError, resSuccess } from "../../../utils/response";
// import data from "../../../../__mocks__/ielts-material";
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
    case "DELETE":
      deleteData(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const getData = async (
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) => {
  const { id } = req.query;

  try {
    const result = await db("tb_ielts_material").where("id", "=", id).first();

    if (!result) {
      return resError({
        res,
        data: { message: "Data not found!" },
        statusCode: 404,
      });
    }

    return resSuccess({
      res,
      data: { result },
    });
  } catch (error) {
    console.log("error", error);
    resError({ res, data: { message: "Get data error!" } });
  }
};

const deleteData = async (
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) => {
  const { id } = req.query;

  try {
    await db("tb_ielts_material").where("id", "=", id).del();

    return resSuccess({ res, data: { message: "Delete data success!" } });
  } catch (error) {
    console.log("error", error);
    resError({ res, data: { message: "Delete data error!" } });
  }
};
