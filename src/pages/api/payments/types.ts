import type { NextApiRequest, NextApiResponse } from "next";
import { PropsDataRes, resSuccess } from "../../../utils/response";
import data from "../../../../__mocks__/payment-type";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) {
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
  return resSuccess({ res, data: { result: data } });
};

const postData = async (
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) => {
  return resSuccess({ res, data: { message: "Create data success!" } });
};

const putData = async (
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) => {
  return resSuccess({ res, data: { message: "Edit data success!" } });
};
