import { useSelector, useDispatch } from "react-redux";
import { cryptocurrencyActions } from "../../store/cryptocurrency-slice";

import Tippy from "@tippyjs/react";
import "./PerPageSelect.css";

const options = [100, 50, 20];

const PerPageSelect = (props) => {
  const dispatch = useDispatch();
  const perPage = useSelector((state) => state.cryptocurrency.perPage);

  const handleChangeRowsPerPage = (number) => {
    dispatch(
      cryptocurrencyActions.changeRowsPerPage({
        perPage: number,
      })
    );
  };

  return (
    <div className={`${props.classes} font-medium dark:text-white`}>
      Show rows
      <Tippy
        content={
          <ul className="font-medium space-y-3">
            {options.map((option) => (
              <li
                key={option}
                className="cursor-pointer"
                onClick={() => handleChangeRowsPerPage(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        }
        interactive={true}
        trigger="click"
        animation="fade"
        placement="bottom-start"
        arrow={true}
        theme="light"
        offset={[0, 10]}
      >
        <button
          className="bg-slate-400/10 hover:bg-slate-400/20 dark:text-white rounded-md ml-2"
          style={{ padding: "5px 8px" }}
        >
          {perPage}
        </button>
      </Tippy>
    </div>
  );
};

export default PerPageSelect;
