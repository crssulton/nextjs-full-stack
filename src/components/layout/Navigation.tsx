import Link from "next/link";

const Navigation = () => {
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
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
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
