import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cryptocurrencyActions } from "../../store/cryptocurrency-slice";

import PerPageSelect from "../UI/PerPageSelect";
import Paginate from "./Paginate";
import "./PaginateWrapper.css";

const PaginateWrapper = React.memo(() => {
  const dispatch = useDispatch();
  const pageCount = useSelector((state) => state.cryptocurrency.totalPages);
  const currentPage = useSelector((state) => state.cryptocurrency.currentPage);
  const perPage = useSelector((state) => state.cryptocurrency.perPage);
  const totalItems = useSelector((state) => state.cryptocurrency.totalItems);

  const pagesVisited = currentPage * perPage;

  const changePageHandler = useCallback(
    ({ selected }) => {
      dispatch(cryptocurrencyActions.changePage({ page: selected }));
    },
    [dispatch]
  );

  return (
    <>
      <div className="flex justify-between items-center mt-8 mb-4 text-slate-600 dark:text-slate-300">
        <span className="text-sm">
          Showing {pagesVisited + 1} - {pagesVisited + perPage} out of{" "}
          {totalItems}
        </span>
        <Paginate
          classes="hidden md:flex items-center justify-center space-x-1 table-paginate"
          pageCount={pageCount}
        />
        <PerPageSelect classes="text-sm" />
      </div>
      <Paginate
        classes="flex items-center justify-center space-x-1 table-paginate md:hidden"
        pageCount={pageCount}
      />
    </>
  );
});

export default PaginateWrapper;
