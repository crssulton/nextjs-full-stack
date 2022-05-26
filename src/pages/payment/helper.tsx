import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  AccountNo: Yup.string().required("Required"),
  accountName: Yup.string().required("Required"),
});

const initialValues = {
  name: "",
  AccountNo: "",
  accountName: "",
};

const formList = [
  {
    name: "name",
    label: "Name",
    type: "text",
    require: true,
  },
  {
    name: "AccountNo",
    label: "Account No",
    type: "number",
    require: true,
  },
  {
    name: "accountName",
    label: "Account Name",
    type: "text",
    require: true,
  },
  {
    name: "img",
    label: "Image",
    type: "file",
    require: false,
    disabled: true,
  },
];

export { validationSchema, initialValues, formList };
