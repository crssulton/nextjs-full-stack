import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../../../__mocks__/ielts-material";
import { PropsDataRes, resError, resSuccess } from "../../../utils/response";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) {
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
  const {
    query: { id },
  } = req;

  const dataRow: { id: number }[] = [...data];
  const result = dataRow.find((o) => o.id === Number(id));

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
};

const deleteData = async (
  req: NextApiRequest,
  res: NextApiResponse<PropsDataRes>
) => {
  const {
    query: { id },
  } = req;

  console.log("id", id);

  return resSuccess({ res, data: { message: "Delete data success!" } });
};
