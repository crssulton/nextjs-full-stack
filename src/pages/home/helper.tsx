import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

const formList = [
  {
    name: "email",
    label: "Email",
    type: "email",
    require: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    require: true,
  },
];

export { validationSchema, initialValues, formList };
