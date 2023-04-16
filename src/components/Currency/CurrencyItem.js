import React, { Fragment, useEffect, useState, useRef } from "react";
import usePrevious from "../../hooks/usePrevious";
import { Transition } from "react-transition-group";

import empty from "../../assets/cryptocurrency-icons/empty.svg";
import { ReactComponent as CaretDown } from "../../assets/svg/caret-down.svg";
import { ReactComponent as CaretUp } from "../../assets/svg/caret-up.svg";

import "./CurrencyItem.css";

const DURATION = 300;

const CurrencyItem = React.memo((props) => {
  const prevData = usePrevious(props);

  const [animation, setAnimation] = useState(null);
  const [show, setShow] = useState(false);

  const imgRef = useRef(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const importedIcon = await import(
          `../../../node_modules/cryptocurrency-icons/svg/color/${props.symbol.toLowerCase()}.svg`
        );
        imgRef.current.src = importedIcon.default;
      } catch (error) {
        imgRef.current.src = empty;
      }
    };
    fetchSvg();
  }, [props.symbol]);

  useEffect(() => {
    let animate = animation;
    let shouldShow = false;

    if (prevData && props.price > prevData.price) {
      shouldShow = true;
      animate = "up";
      resetAnimation();
    } else if (prevData && props.price < prevData.price) {
      shouldShow = true;
      animate = "down";
      resetAnimation();
    }

    setAnimation(animate);
    setShow(shouldShow);
  }, [props.price, prevData, animation]);

  const resetAnimation = () => {
    setTimeout(() => {
      setShow(false);
    }, DURATION);
  };

  return (
    <Fragment>
      <Transition in={show} timeout={DURATION}>
        {(state) => (
          <tr
            className={`hover:bg-slate-50 transition duration-300 ease-in-out anim-${animation}-${state} `}
            key={props.rank}
          >
            <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
              {props.rank}
            </td>
            <td className="border-b border-slate-200 dark:border-slate-600 p-4 pr-8 text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <img
                  ref={imgRef}
                  src={empty}
                  alt={`Logo ${props.name}`}
                  width={32}
                  height={32}
                  className="mr-2"
                />
                {props.name}
                <span className="text-slate-300"> {props.symbol} </span>
              </div>
            </td>
            <td className="border-b border-slate-200 dark:border-slate-600 p-4 pr-8 text-slate-500 dark:text-slate-400">
              {props.price}
            </td>
            <td
              className={`${
                props.changePercent24Hr > 0
                  ? "text-green-500 "
                  : "text-red-500 "
              } border-b border-slate-200 dark:border-slate-600 p-4 pr-8 dark:text-slate-400`}
            >
              {" "}
              <div className="flex items-center">
                {props.changePercent24Hr > 0 ? (
                  <CaretUp className="fill-green-500 w-4 h-4" />
                ) : (
                  <CaretDown className="fill-red-500 w-4 h-4" />
                )}
                {props.changePercent24Hr}%
              </div>
            </td>
            <td className="border-b border-slate-200 dark:border-slate-600 p-4 pr-8 text-slate-500 dark:text-slate-400">
              {props.marketCapUsd}
            </td>
            <td className="border-b border-slate-200 dark:border-slate-600 p-4 pr-8 text-slate-500 dark:text-slate-400">
              {props.volumeUsd24Hr}
            </td>
          </tr>
        )}
      </Transition>
    </Fragment>
  );
});

export default CurrencyItem;
