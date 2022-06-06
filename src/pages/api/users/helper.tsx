import db from "../../../libs/db";
import * as bcrypt from "bcrypt";

export const validateUser = async (body: {
  email: string;
  password: string;
}) => {
  const user = await db("tb_users").where("email", "=", body.email).first();
  if (user) {
    const hash = await bcrypt.hash(body.password, user?.salt);
    if (hash !== user?.password) throw new Error("User is exist!");
    return true;
  }

  return false;
};
