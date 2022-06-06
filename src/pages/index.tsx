import { GetServerSidePropsContext } from "next";
import { API, decodeToken, getToken } from "../utils";
import Home from "./home";

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  let { access_token } = getToken(req?.cookies);
  let user: object = { name: "", email: "" };

  if (access_token) {
    const decode = decodeToken(access_token);
    const res = await API({
      path: `/api/users/${decode?.sub}`,
      method: "GET",
      access_token,
    });
    if (res?.status) user = res?.result as object;
  }

  return {
    props: { access_token, user },
  };
};

type Props = {
  access_token: string;
  user: object;
};

const index = (props: Props) => {
  return <Home {...props} />;
};

export default index;
