import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cryptocurrencyActions } from "../../store/cryptocurrency-slice";

import Paginate from "./Paginate";
import "./PaginateWrapper.css";
import DropdownSelect from "../UI/DropdownSelect";

const PaginateWrapper = React.memo(() => {
  const dispatch = useDispatch();
  const { totalPages, currentPage, perPage, totalItems } = useSelector(
    (state) => state.cryptocurrency
  );

  const pagesVisited = currentPage * perPage;

  const handleChangeRowsPerPage = (number) => {
    dispatch(
      cryptocurrencyActions.changeRowsPerPage({
        perPage: number,
      })
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mt-8 mb-4 text-slate-600 dark:text-slate-300">
        <span className="text-sm">
          Showing {pagesVisited + 1} - {pagesVisited + perPage} out of{" "}
          {totalItems}
        </span>
        <Paginate
          classes="hidden md:flex items-center justify-center space-x-1 table-paginate"
          pageCount={totalPages}
        />
        <DropdownSelect
          value={perPage}
          title="Show rows: "
          options={[100, 50, 20]}
          onChange={handleChangeRowsPerPage}
          classes="text-xs"
        />
      </div>
      <Paginate
        classes="flex items-center justify-center space-x-1 table-paginate md:hidden"
        pageCount={totalPages}
      />
    </>
  );
});

export default PaginateWrapper;
