import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/images/login.png";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/features/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const previousURL = useSelector(selectPreviousURL);

  // Redirect user back to cart page if previous url contains "cart"
  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/");
  };

  // Sign in with email and password
  const loginUser = (e) => {
    e.preventDefault();

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Signed In Successfully!");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // Sign in with Google
  const signInWithGoogle = () => {
    setIsLoading(true);

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Login Successful!");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="position-absolute top-50 start-50 translate-middle w-100 my-3">
        <div className="d-flex flex-column flex-lg-row justify-content-center gap-3 align-items-center p-5 my-5 w-75 mx-auto">
          <div className="w-50 d-none d-sm-flex justify-content-center align-items-center">
            <img src={loginImg} alt="Login" className="img-fluid" />
          </div>
          <div className="w-100 shadow p-3 rounded-4">
            <h3 className="text-center text-warning py-3">Login</h3>
            <form className="d-flex flex-column" onSubmit={loginUser}>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              onClick={() => signInWithGoogle()}
            >
              <FaGoogle />
              &nbsp;Login with Google
            </button>
            <div className="text-center py-1">
              <p>
                Don't have an account?
                <Link
                  to="/register"
                  className="text-decoration-none text-warning"
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

export default Login;
