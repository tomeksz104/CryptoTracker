import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { currencyActions } from "../../store/currency-slice";

import "./Pagination.css";
import PerPageSelect from "../UI/PerPageSelect";
import { ReactComponent as ChevronLeft } from "../../assets/svg/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../../assets/svg/chevron-right.svg";

const Pagination = React.memo(() => {
  const dispatch = useDispatch();
  const pageCount = useSelector((state) => state.currency.totalPages);
  const pageNumber = useSelector((state) => state.currency.pageNumber);
  const perPage = useSelector((state) => state.currency.perPage);
  const totalItems = useSelector((state) => state.currency.totalItems);

  const pagesVisited = pageNumber * perPage;

  const changePageHandler = useCallback(
    ({ selected }) => {
      dispatch(currencyActions.pageChanged({ page: selected }));
    },
    [dispatch]
  );

  return (
    <div className="flex justify-between items-center mt-8 mb-4">
      <span className="text-sm">
        Wyświetlanie {pagesVisited + 1} - {pagesVisited + perPage} z{" "}
        {totalItems}
      </span>
      <ReactPaginate
        breakLabel={<span className="mx-2">...</span>}
        className="flex items-center justify-center space-x-1 table-paginate"
        previousLabel={
          <span className="w-2 h-2 flex items-center justify-center mr-8">
            <ChevronLeft />
          </span>
        }
        nextLabel={
          <span className="w-2 h-2 flex items-center justify-center ml-8">
            <ChevronRight />
          </span>
        }
        pageCount={pageCount}
        onPageChange={changePageHandler}
      />
      <PerPageSelect classes="text-sm" />
    </div>
  );
});

export default Pagination;
