import { useContext } from "react";
import DarkmodeContext from "../../context/darkmode-context";

import Tippy from "@tippyjs/react";
import "./DropdownSelect.css";

const DropdownSelect = (props) => {
  const darkmodeCtx = useContext(DarkmodeContext);

  const handleChangeOption = (option) => {
    props.onChange(option);
  };

  return (
    <div
      className={`${props.classes} font-medium text-neutral-800 dark:text-neutral-300`}
    >
      {props.title}
      <Tippy
        className={darkmodeCtx.isDarkmode ? "tippy-box dark" : "tippy-box"}
        content={
          <ul className="font-medium space-y-3">
            {props.options.map((option) => (
              <li
                key={option}
                className="cursor-pointer"
                onClick={() => handleChangeOption(option)}
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
        <button className="px-3 py-2 bg-slate-400/10 hover:bg-slate-400/20 text-neutral-800 dark:text-neutral-300 rounded-md">
          {props.value}
        </button>
      </Tippy>
    </div>
  );
};

export default DropdownSelect;
