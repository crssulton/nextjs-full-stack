type Props = {
  path: string;
  method: string;
  body?: object;
};

type ResProps = {
  status: boolean;
  result?: any[] | object;
  message?: string;
  count?: number;
};

const API = async ({ path, method, body = {} }: Props) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
  const token = `Bearer ${""}`;
  const options: any = {
    method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authentication: token,
    },
  };

  if (method !== "GET" && method !== "DELETE") {
    options.body = JSON.stringify(body);
  }

  const res: ResProps = await fetch(url, options).then((response) =>
    response.json()
  );

  return res;
};

export default API;
