import { Link } from "react-router-dom";
import resetImg from "../../assets/images/forgot.png";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Reset password
  const resetPassword = (e) => {
    e.preventDefault();

    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email for a reset link!");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="position-absolute top-50 start-50 translate-middle w-100 my-3">
        <div className="d-flex flex-column flex-lg-row justify-content-center gap-3 align-items-center p-5 my-5 w-75 mx-auto">
          <div className="w-50 d-none d-sm-flex justify-content-center align-items-center">
            <img src={resetImg} alt="Login" className="img-fluid" />
          </div>
          <div className="w-100 shadow p-3 rounded-4">
            <h3 className="text-center text-warning py-3">Reset Password</h3>
            <form className="d-flex flex-column" onSubmit={resetPassword}>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
    </>
  );
};

export default Reset;
