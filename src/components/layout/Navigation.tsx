import Link from "next/link";
import { confirmAlert } from "react-confirm-alert";
import { AlertConfirm } from "../forms";
import { logout } from "../../utils";
import Router from "next/router";

type Props = {
  access_token: string;
};

const Navigation = (props: Props) => {
  const { access_token } = props;

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link href={"/"}>
          <a className="navbar-brand" href="#">
            PB
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {access_token && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href={"payment"}>
                  <a className="nav-link active" aria-current="page" href="#">
                    Payment Type
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"info-beasiswa"}>
                  <a className="nav-link" href="#">
                    Info Beasiswa
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"ielts-material"}>
                  <a className="nav-link" href="#">
                    IELTS Material
                  </a>
                </Link>
              </li>
            </ul>
            <span
              className="btn navbar-text"
              onClick={() =>
                confirmAlert({
                  customUI: ({ onClose }) => (
                    <AlertConfirm
                      onClose={() => onClose()}
                      desc={'You want to logout?'}
                      onConfirm={() => {
                        logout();
                        onClose();
                        Router.reload();
                      }}
                    />
                  ),
                })
              }
            >
              <i className="bi bi-box-arrow-right"></i> Logout
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
