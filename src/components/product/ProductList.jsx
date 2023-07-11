import { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../Search";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  selectFilteredProducts,
} from "../../redux/features/filterSlice";
import Pagination from "../Pagination";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(2);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  // Filter Products by Search
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ search, products }));
  }, [dispatch, search, products]);

  // Sort Products
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ sort, products }));
  }, [dispatch, sort, products]);

  return (
    <div className="pt-2 mb-8">
      <div className="d-flex flex-column flex-lg-row justify-content-between">
        <div className="d-flex gap-2 align-items-center mb-2">
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
            <strong>{filteredProducts.length}</strong> Products Found
          </p>
        </div>
        {/* Search Icon  */}
        <div className="mb-2 w-50 w-lg-33">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className="d-none d-lg-flex gap-2 justify-content-start align-items-center mb-2">
          <label>Sort By: </label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
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
        {filteredProducts.length === 0 ? (
          <p>No Products Found</p>
        ) : (
          <>
            {currentProducts.map((product) => {
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
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};

export default ProductList;
