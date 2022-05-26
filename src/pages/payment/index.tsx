import cogoToast from "cogo-toast";
import { useFormik } from "formik";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { AlertConfirm, InputText, TablePaymentType } from "../../components";
import { API } from "../../utils";
import { initialValues, validationSchema, formList } from "./helper";

const limit = 5;

export const getServerSideProps = async () => {
  const res = await API({
    path: `/api/payments/types?limit=${limit}`,
    method: "GET",
  });

  return {
    props: { data: res?.result, count: res?.count },
  };
};

type Props = {
  data: any[];
  count: number;
};

const Payment = (props: Props) => {
  const [data, setData] = useState(props.data);
  const [count, setCount] = useState(props.count);
  const [dataEdit, setDataEdit] = useState({});
  const [page, setPage] = useState(1);

  const handleSumit = async (value: object, setSubmitting: any) => {
    try {
      const { id }: any = dataEdit;
      const method = id ? "PUT" : "POST";
      const body = { ...value, id };
      const res = await API({ path: "/api/payments/types", method, body });

      if (!res?.status) throw new Error(res?.message);

      getData(page);

      cogoToast.success(res?.message, {
        position: "top-right",
      });

      setValue({});
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

  const setValue = (v: any) => {
    formik.setFieldValue("name", v.name || "");
    formik.setFieldValue("AccountNo", v.AccountNo || "");
    formik.setFieldValue("accountName", v.accountName || "");
    formik.setFieldValue("img", v.img || null);
    setDataEdit(v);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await API({
        path: `/api/payments/type/${id}`,
        method: "DELETE",
      });

      if (!res?.status) throw new Error(res?.message);

      const realPage = Math.ceil((count - 1) / limit);
      const setPage = realPage < page ? realPage : page;

      getData(setPage);

      cogoToast.success(res?.message, {
        position: "top-right",
      });
    } catch (error: any) {
      cogoToast.error(error?.message || "Error!", {
        position: "top-right",
      });
    }
  };

  const getData = async (page: number) => {
    setPage(page);
    const newOffset = limit * (page - 1);
    const res = await API({
      path: `/api/payments/types?limit=${limit}&offset=${newOffset}`,
      method: "GET",
    });

    setData(res?.result as any[]);
    setCount(res?.count || count);
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-8">
          <small>Total: {count} data</small>
          <TablePaymentType
            data={data}
            page={page}
            limit={limit}
            count={count}
            handleChangePage={(e: any, value: number) => getData(value)}
            setDataEdit={(v: any) => setValue(v)}
            handleDelete={(id) =>
              confirmAlert({
                customUI: ({ onClose }) => (
                  <AlertConfirm
                    onClose={() => onClose()}
                    onConfirm={() => {
                      handleDelete(id);
                      onClose();
                    }}
                  />
                ),
              })
            }
          />
        </div>
        <div className="col-4">
          <form
            className="border border-secondary rounded p-3 needs-validation"
            onSubmit={formik.handleSubmit}
          >
            <fieldset>
              <legend>Form Payment Type</legend>
              {formList.map((list, key) => (
                <InputText
                  key={key}
                  label={list.label}
                  name={list.name}
                  values={formik.values}
                  setFieldValue={(f, v) => formik.setFieldValue(f, v)}
                  type={list.type}
                  required={list.require}
                  disabled={list.disabled}
                />
              ))}
              <div className="row">
                <div className="col-2 d-grid gap-2">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    disabled={formik.isSubmitting}
                    onClick={() => setValue({})}
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                </div>
                <div className="col-10 d-grid gap-2">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    <i className="bi bi-upload"></i> Submit
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
