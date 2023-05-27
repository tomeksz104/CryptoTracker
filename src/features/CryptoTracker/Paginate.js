import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { cryptocurrencyActions } from "../../store/cryptocurrency-slice";
import ReactPaginate from "react-paginate";

import { ReactComponent as ChevronLeft } from "../../assets/svg/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../../assets/svg/chevron-right.svg";

const Paginate = ({ classes, pageCount }) => {
  const dispatch = useDispatch();

  const changePageHandler = useCallback(
    ({ selected }) => {
      dispatch(cryptocurrencyActions.changePage({ page: selected }));
    },
    [dispatch]
  );

  return (
    <ReactPaginate
      breakLabel={<span className="mx-2">...</span>}
      className={classes}
      activeClassName="selected text-white dark:text-slate-900"
      previousLabel={
        <span className="w-2 h-2 flex items-center justify-center mr-8 fill-slate-600 dark:fill-slate-300">
          <ChevronLeft />
        </span>
      }
      nextLabel={
        <span className="w-2 h-2 flex items-center justify-center ml-8 fill-slate-600 dark:fill-slate-300">
          <ChevronRight />
        </span>
      }
      pageCount={pageCount}
      onPageChange={changePageHandler}
    />
  );
};

export default Paginate;
