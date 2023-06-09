import { Link, useNavigate } from "react-router-dom";
import registerImg from "../../assets/images/register.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      toast.error("Passwords do not match.");
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Registration Successful!");
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <div className="position-absolute top-50 start-50 translate-middle w-100 my-3">
        <div className="d-flex flex-column flex-lg-row justify-content-center gap-3 align-items-center p-5 my-5 w-75 mx-auto">
          <div className="w-50 d-none d-sm-flex justify-content-center align-items-center">
            <img src={registerImg} alt="Login" className="img-fluid" />
          </div>
          <div className="w-100 shadow p-3 rounded-4">
            <h3 className="text-center text-warning py-3">Register</h3>
            <form className="d-flex flex-column" onSubmit={registerUser}>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control"
                  required
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 mt-1 mx-auto"
              >
                Register
              </button>
            </form>
            <div className="text-center py-1">
              <p>
                Already have an account?
                <Link to="/login" className="text-decoration-none text-warning">
                  &nbsp;Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
