import { useDispatch, useSelector } from "react-redux";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../redux/features/productSlice";
import { useEffect, useState } from "react";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../redux/features/filterSlice";

const ProductFilter = () => {
  const products = useSelector(selectProducts);
  const [category, setCategory] = useState("All Categories");
  const [brand, setBrand] = useState("All Brands");
  const [price, setPrice] = useState(3000);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

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

  // Filter products based on selected brand
  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  // Filter products based on price
  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  // Filter products based on selected category
  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const clearFilters = () => {
    setCategory("All Categories");
    setBrand("All Brands");
    setPrice(maxPrice);
  };

  return (
    <div className="container">
      <div>
        <h5>Categories</h5>
        <div className="d-flex flex-column">
          {allCategories.map((cat, index) => {
            return (
              <button
                key={index}
                type="button"
                className={
                  `${category}` === cat
                    ? `border-0 border-start border-warning border-3 bg-transparent text-start pt-1 pb-0 ps-2 active`
                    : `border-0 bg-transparent text-start pt-1 pb-0 ps-2`
                }
                data-bs-dismiss="offcanvas"
                data-bs-target="#offcanvasFilters"
                onClick={() => filterProducts(cat)}
              >
                &#8250; {cat}
                <hr className="mt-2" />
              </button>
            );
          })}
        </div>
        <h5 className="mt-4">Brands</h5>
        <div>
          <select
            className="w-100 p-1"
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
        <h5 className="mt-4">Price</h5>
        <p className="mb-1">{`$${price}`}</p>
        <div>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <button
          className="btn btn-primary mt-1"
          onClick={clearFilters}
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasFilters"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
