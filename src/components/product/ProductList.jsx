import { useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../Search";
import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <div className="container pt-2 mb-8">
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-2 align-items-center">
          <BsFillGridFill
            size={22}
            className="text-warning"
            onClick={() => setGrid(true)}
          />
          <FaListAlt
            size={24}
            className="text-primary"
            onClick={() => setGrid(false)}
          />
          <p className="my-auto">
            <strong>10</strong> Products Found
          </p>
        </div>
        {/* Search Icon  */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className="d-flex gap-2 justify-content-center align-items-center">
          <label>Sort By: </label>
          <select>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <hr className="mb-3" />
      <div className={grid ? "row g-3 mb-3" : "d-flex flex-column gap-3 mb-3"}>
        {products.length === 0 ? (
          <p>No Products Found</p>
        ) : (
          <>
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className={grid ? "col-lg-4 col-md-6" : "w-100"}
                >
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
