import { Pagination } from "@mui/material";

type Props = {
  data: any[];
  setDataEdit: (v: object) => void;
  handleDelete: (id: number) => void;
  page?: number;
  limit?: number;
  count: number;
  handleChangePage?: any;
};

const TableInfoBeasiswa = ({
  data,
  setDataEdit,
  handleDelete,
  page = 1,
  limit = 10,
  handleChangePage,
  count,
}: Props) => {
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" style={{width: 40}}>#</th>
            <th scope="col">Title</th>
            <th scope="col">Desc</th>
            <th scope="col" style={{width: 160}}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, key: number) => (
            <tr key={key}>
              <th scope="row">{key + 1 + limit * (page - 1)}</th>
              <td>{item.title}</td>
              <td>{item.desc}</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() => setDataEdit(item)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="bi bi-trash3"></i> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data?.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center fw-bold">
                Empty
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {handleChangePage && (
        <Pagination
          count={Math.ceil(count / limit)}
          variant="outlined"
          shape="rounded"
          className="mt-3"
          showFirstButton
          showLastButton
          page={page}
          onChange={handleChangePage}
        />
      )}
    </>
  );
};

export default TableInfoBeasiswa;
