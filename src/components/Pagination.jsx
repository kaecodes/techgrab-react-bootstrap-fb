import React, { useState } from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  // Get total number of pages
  const totalPages = totalProducts / productsPerPage;
  // Limit the page numbers shown
  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Go to next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    // Show next set of page numbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // Go to previous page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    // Show previous set of page numbers
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // Make page numbers dynamic by looping through the number of pages
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <ul className="navbar-nav d-flex flex-row">
        <li
          className={
            currentPage === pageNumbers[0] ? "d-none" : "border px-3 py-1"
          }
          onClick={paginatePrev}
        >
          Prev
        </li>
        {pageNumbers.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <li
                key={number}
                className={
                  currentPage === number
                    ? "border px-3 py-1 bg-success text-light border-success"
                    : "border px-3 py-1"
                }
                onClick={() => paginate(number)}
              >
                {number}
              </li>
            );
          }
        })}
        <li
          className={
            currentPage === pageNumbers[pageNumbers.length - 1]
              ? "d-none"
              : "border px-3 py-1"
          }
          onClick={paginateNext}
        >
          Next
        </li>
      </ul>
      <p className="mt-2">
        <strong className="text-success">{`Page ${currentPage}`}</strong>
        <span>{` of `}</span>
        <strong>{`${Math.ceil(totalPages)}`}</strong>
      </p>
    </div>
  );
};

export default Pagination;
