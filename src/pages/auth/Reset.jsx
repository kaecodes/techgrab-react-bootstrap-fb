import { Link } from "react-router-dom";
import resetImg from "../../assets/images/forgot.png";

const Reset = () => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle w-100 my-3">
      <div className="d-flex flex-column flex-lg-row justify-content-center gap-3 align-items-center p-5 my-5 w-75 mx-auto">
        <div className="w-50 d-none d-sm-flex justify-content-center align-items-center">
          <img src={resetImg} alt="Login" className="img-fluid" />
        </div>
        <div className="w-100 shadow p-3 rounded-4">
          <h3 className="text-center text-warning pt-2">Reset Password</h3>
          <form action="" className="d-flex flex-column">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                placeholder="janedoe@example.com"
                className="form-control"
                id="email"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mx-auto">
              Reset Password
            </button>
          </form>
          <div className="d-flex justify-content-between py-2">
            <p>
              <Link
                to="/login"
                className="text-decoration-none text-warning fw-bold"
              >
                &nbsp;Login
              </Link>
            </p>
            <p>
              <Link
                to="/register"
                className="text-decoration-none text-warning fw-bold"
              >
                &nbsp;Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
