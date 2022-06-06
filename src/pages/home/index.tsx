import { useFormik } from "formik";
import styles from "../../styles/Home.module.css";
import { API, setLogin } from "../../utils";
import cogoToast from "cogo-toast";
import { initialValues, validationSchema, formList } from "./helper";
import Router from "next/router";
import { InputText } from "../../components";

type Props = {
  access_token: string;
  user: any;
};

const Home = (props: Props) => {
  const { access_token, user } = props;
  const handleSumit = async (body: object, setSubmitting: any) => {
    try {
      const res = await API({ path: "/api/auth/login", method: "POST", body });

      if (!res?.access_token) throw new Error(res?.message);

      cogoToast.success("Login Success", {
        position: "top-right",
      });

      setLogin({
        access_token: res?.access_token || "",
        refresh_token: res?.refresh_token || "",
      });

      Router.reload();
    } catch (error: any) {
      cogoToast.error(error?.message || "Error!", {
        position: "top-right",
      });
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleSumit(values, setSubmitting);
    },
  });

  return (
    <div className={styles.container}>
      {access_token ? (
        <main className={styles.main}>
          <h1 className={styles.title}>Hi, {user?.name}</h1>
        </main>
      ) : (
        <div className="row mt-5">
          <div className="col-4" />
          <div className="col-4">
            <form
              className="border border-secondary rounded p-3 needs-validation"
              onSubmit={formik.handleSubmit}
            >
              <legend className="text-center">Login</legend>
              {formList.map((list, key) => (
                <InputText
                  key={key}
                  label={list.label}
                  name={list.name}
                  values={formik.values}
                  setFieldValue={(f, v) => formik.setFieldValue(f, v)}
                  type={list.type}
                  required={list.require}
                />
              ))}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
