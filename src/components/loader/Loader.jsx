import loaderImg from "../../assets/images/loader.gif";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div
      className="position-absolute w-100 h-100 bg-black bg-opacity-75"
      style={{ zIndex: "1" }}
    >
      <div
        className="position-absolute top-50 start-50 translate-middle"
        style={{ zIndex: "2" }}
      >
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
