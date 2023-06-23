import React from "react";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";

const Product = () => {
  return (
    <section className="container d-flex gap-4 flex-column flex-md-row">
      <aside className="w-100 w-md-25">
        <ProductFilter />
      </aside>
      <div className="w-100 w-md-75">
        <ProductList />
      </div>
    </section>
  );
};

export default Product;
