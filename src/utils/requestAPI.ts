import { getToken } from "./helper";

type Props = {
  path: string;
  method: string;
  body?: object;
  access_token?: string;
};

type ResProps = {
  status: boolean;
  result?: any[] | object;
  message?: string;
  count?: number;
  access_token?: string;
  refresh_token?: string;
};

const API = async ({ path, method, body = {}, access_token = "" }: Props) => {
  try {
    if(!access_token) {
      access_token = getToken().access_token
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
    const token = `Bearer ${access_token}`;
    
    const options: any = {
      method,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    };

    if (method !== "GET" && method !== "DELETE") {
      options.body = JSON.stringify(body);
    }

    const res: ResProps = await fetch(url, options).then((response) =>
      response.json()
    );

    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export default API;
