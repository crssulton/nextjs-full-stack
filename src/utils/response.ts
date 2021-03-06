import type { NextApiResponse } from "next";

type PropsDataRes = {
  result?: any[] | object;
  message?: string;
  count?: number;
};

type Props = {
  res: NextApiResponse;
  data: PropsDataRes;
  statusCode?: number;
};

const resSuccess = ({ res, data, statusCode = 200 }: Props) => {
  return res.status(statusCode).json({ ...data, status: true });
};

const resError = ({ res, data, statusCode = 400 }: Props) => {
  return res
    .status(statusCode)
    .json({ result: [], count: 0, ...data, status: false });
};

export { resSuccess, resError };

export type { PropsDataRes };
