import { useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";

const ProductList = () => {
  const [grid, setGrid] = useState(true);

  return (
    <div className="container">
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
          <p className="my-auto">Search</p>
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
    </div>
  );
};

export default ProductList;
