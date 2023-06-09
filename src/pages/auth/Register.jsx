import { Link } from "react-router-dom";
import registerImg from "../../assets/images/register.png";

const Register = () => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle w-100 my-3">
      <div className="d-flex flex-column flex-lg-row justify-content-center gap-3 align-items-center p-5 my-5 w-75 mx-auto">
        <div className="w-50 d-none d-sm-flex justify-content-center align-items-center">
          <img src={registerImg} alt="Login" className="img-fluid" />
        </div>
        <div className="w-100 shadow p-3 rounded-4">
          <h3 className="text-center text-warning pt-2">Register</h3>
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
            <div className="mb-3">
              <label htmlFor="password" className="form-label" id="password">
                Password:
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label" id="cpassword">
                Confirm Password:
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3 mx-auto"
            >
              Register
            </button>
          </form>
          <div className="text-center py-1">
            <p>
              Already have an account?
              <Link to="/login" className="text-decoration-none">
                &nbsp;Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
