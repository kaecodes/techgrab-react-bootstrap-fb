import { useSelector } from "react-redux";
import { selectEmail } from "../redux/features/authSlice";
import { Link } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "kaela@gmail.com") {
    return children;
  } else {
    return (
      <section className="container">
        <div className="mt-5">
          <h2 className="text-warning">Permission Denied.</h2>
          <p>This page can only be viewed by an Admin user.</p>
          <br />
          <Link to="/">
            <button className="btn btn-primary">&larr; Back to Home</button>
          </Link>
        </div>
      </section>
    );
  }
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "kaela@gmail.com") {
    return children;
  } else {
    return null;
  }
};

export default AdminOnlyRoute;
