import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase/config";
import { toast } from "react-toastify";

const category = [
  { id: 1, name: "Laptops" },
  { id: 2, name: "Smartphones" },
  { id: 3, name: "Smartwatches" },
  { id: 4, name: "Bluetooth Speakers" },
  { id: 5, name: "Cameras" },
  { id: 6, name: "Tablets" },
  { id: 7, name: "Headphones" },
  { id: 8, name: "Gaming" },
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `techgrab/${Date.now()}${file.name}`);

    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed();
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully!");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className="container-md px-4 py-2">
      <h2 className="py-1 my-3 text-center text-success fw-bold">
        Add New Product
      </h2>
      <form className="shadow p-3 rounded mb-3" onSubmit={addProduct}>
        <div className="mb-3">
          <label className="form-label">Product Name:</label>
          <input
            type="text"
            placeholder="Product Name"
            className="form-control"
            required
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image:</label>
          <div className="border p-3 rounded">
            <div className="mb-2 text-center">
              {uploadProgress === 0 ? null : (
                <div
                  style={{ backgroundColor: "#a9a9a9" }}
                  className="rounded-5"
                >
                  <div
                    className="bg-primary text-light py-1 px-4 rounded-5"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    <small>
                      {uploadProgress < 100
                        ? `${uploadProgress}%`
                        : `${uploadProgress}%`}
                    </small>
                  </div>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              placeholder="Product Image"
              className="form-control mb-2"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            {product.imageURL === "" ? null : (
              <input
                type="text"
                //
                placeholder="imageURL"
                className="form-control"
                name="imageURL"
                value={product.imageURL}
                disabled
              />
            )}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Product Price:</label>
          <input
            type="number"
            placeholder="Product Price"
            className="form-control"
            required
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Category:</label>
          <select
            required
            name="category"
            className="form-select"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              Choose Product Category
            </option>
            {category.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Product Brand:</label>
          <input
            type="text"
            placeholder="Product Brand"
            className="form-control"
            required
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Description:</label>
          <textarea
            name="desc"
            className="form-control"
            required
            value={product.desc}
            cols="30"
            rows="10"
            onChange={(e) => handleInputChange(e)}
          ></textarea>
        </div>
        <button className="btn btn-primary">Save Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
