import { useSelector, useDispatch } from "react-redux";
import { currencyActions } from "../../store/currency-slice";

import Tippy from "@tippyjs/react";
import "./PerPageSelect.css";

const options = [100, 50, 20];

const PerPageSelect = (props) => {
  const dispatch = useDispatch();
  const perPage = useSelector((state) => state.currency.perPage);

  const handleChangeRowsPerPage = (number) => {
    dispatch(
      currencyActions.changeRowsPerPage({
        perPage: number,
      })
    );
  };

  return (
    <div className={props.classes}>
      Pokaż wierszy
      <Tippy
        content={
          <ul className="font-semibold space-y-3">
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
          className="bg-neutral-100 hover:bg-neutral-150 rounded-md font-semibold ml-2"
          style={{ padding: "5px 8px" }}
        >
          {perPage}
        </button>
      </Tippy>
    </div>
  );
};

export default PerPageSelect;
