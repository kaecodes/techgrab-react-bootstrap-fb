import { Link } from "react-router-dom";
import loginImg from "../../assets/images/login.png";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle w-100 my-3">
      <div className="d-flex flex-column flex-lg-row justify-content-center gap-3 align-items-center p-5 my-5 w-75 mx-auto">
        <div className="w-50 d-none d-sm-flex justify-content-center align-items-center">
          <img src={loginImg} alt="Login" className="img-fluid" />
        </div>
        <div className="w-100 shadow p-3 rounded-4">
          <h3 className="text-center text-warning pt-2">Login</h3>
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
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3 mx-auto"
            >
              Login
            </button>
            <Link to="/reset" className="text-decoration-none text-center">
              <small>Reset Password?</small>
            </Link>
          </form>
          <button
            type="submit"
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center mx-auto mt-3"
          >
            <FaGoogle />
            &nbsp;Login with Google
          </button>
          <div className="text-center py-1">
            <p>
              Don't have an account?
              <Link to="/register" className="text-decoration-none">
                &nbsp;Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
