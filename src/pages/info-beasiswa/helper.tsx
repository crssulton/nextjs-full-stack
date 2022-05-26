import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  desc: Yup.string().required("Required"),
});

const initialValues = {
  title: "",
  desc: "",
};

const formList = [
  {
    name: "title",
    label: "Title",
    type: "text",
    require: true,
  },
  {
    name: "desc",
    label: "Desc",
    type: "textarea",
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
