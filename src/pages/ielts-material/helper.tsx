import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  transcripts: Yup.string().required("Required"),
  questions: Yup.string().required("Required"),
  options: Yup.string().required("Required"),
  answer: Yup.string().required("Required"),
});

const initialValues = {
  title: "",
  transcripts: "",
  questions: "",
  options: "",
  answer: "",
};

const formList = [
  {
    name: "title",
    label: "Title",
    type: "text",
    require: true,
  },
  {
    name: "transcripts",
    label: "Transcripts",
    type: "textarea",
    require: true,
  },
  {
    name: "questions",
    label: "Questions",
    type: "textarea",
    require: true,
  },
  {
    name: "options",
    label: "Options",
    type: "textarea",
    require: true,
  },
  {
    name: "answer",
    label: "Answer",
    type: "text",
    require: true,
  },
];

export { validationSchema, initialValues, formList };
