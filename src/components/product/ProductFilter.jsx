import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/features/productSlice";
import { useState } from "react";

const ProductFilter = () => {
  const products = useSelector(selectProducts);
  const [category, setCategory] = useState("All Categories");
  const [brand, setBrand] = useState("All Brands");
  const [price, setPrice] = useState(3000);

  // Get all categories
  const allCategories = [
    "All Categories",
    ...new Set(products.map((product) => product.category)),
  ];

  // Get all brands
  const allBrands = [
    "All Brands",
    ...new Set(products.map((product) => product.brand)),
  ];

  return (
    <div className="container mt-5">
      <div>
        <h5>Categories</h5>
        <div className="d-flex flex-column">
          {allCategories.map((cat, index) => {
            return (
              <button
                key={index}
                type="button"
                className="border-0 bg-transparent text-start border-bottom py-1"
              >
                &#8250; {cat}
              </button>
            );
          })}
        </div>
        <h5 className="mt-3">Brands</h5>
        <div>
          <select
            className="w-75"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            {allBrands.map((brand, index) => {
              return (
                <option key={index} value={brand}>
                  {brand}
                </option>
              );
            })}
          </select>
        </div>
        <h5 className="mt-3">Price</h5>
        <p className="mb-1">{`$${price}`}</p>
        <div>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={20}
            max={300}
          />
        </div>
        <button className="btn btn-primary mt-1">Clear Filters</button>
      </div>
    </div>
  );
};

export default ProductFilter;
