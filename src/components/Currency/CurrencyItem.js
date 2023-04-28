import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import usePrevious from "../../hooks/usePrevious";
import { Transition } from "react-transition-group";
import { currencyActions } from "../../store/currency-slice";

import empty from "../../assets/cryptocurrency-icons/empty.svg";
import { ReactComponent as CaretDown } from "../../assets/svg/caret-down.svg";
import { ReactComponent as CaretUp } from "../../assets/svg/caret-up.svg";

import "./CurrencyItem.css";

const DURATION = 300;

const CurrencyItem = React.memo((props) => {
  const dispatch = useDispatch();
  const prevData = usePrevious(props);
  const { watchlist, currentCurrency } = useSelector((state) => state.currency);
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

    if (prevData) {
      if (props.priceUsd > prevData.priceUsd) {
        shouldShow = true;
        animate = "up";
        resetAnimation();
      } else if (props.priceUsd < prevData.priceUsd) {
        shouldShow = true;
        animate = "down";
        resetAnimation();
      }
    }

    setAnimation(animate);
    setShow(shouldShow);
  }, [props.priceUsd, prevData, animation]);

  const resetAnimation = useCallback(() => {
    setTimeout(() => {
      setShow(false);
    }, DURATION);
  }, []);

  const getChangePercentIcon = useMemo(() => {
    return (changePercent24Hr) => {
      if (isNaN(changePercent24Hr)) {
        return "-";
      } else if (changePercent24Hr > 0) {
        return <CaretUp className="fill-green-500 w-4 h-4" />;
      } else {
        return <CaretDown className="fill-red-500 w-4 h-4" />;
      }
    };
  }, []);

  const handleToggleWatchlist = useCallback(() => {
    if (watchlist.includes(props.symbol)) {
      dispatch(
        currencyActions.removeFromWatchlist({
          currency: {
            symbol: props.symbol,
          },
        })
      );
    } else {
      dispatch(
        currencyActions.addToWatchlist({
          currency: {
            symbol: props.symbol,
          },
        })
      );
    }
  }, [dispatch, watchlist, props.symbol]);

  return (
    <>
      <Transition in={show} timeout={DURATION}>
        {(state) => (
          <tr
            className={`hover:bg-slate-400/10 transition duration-300 ease-in-out anim-${animation}-${state} `}
          >
            <td className="border-b border-slate-200 dark:border-slate-800 py-4 text-slate-600 dark:text-slate-300">
              <svg
                onClick={handleToggleWatchlist}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-4 h-4 hover:text-amber-500 outline-0 ${
                  watchlist.includes(props.symbol) ? "text-amber-500" : ""
                } cursor-pointer transition-colors duration-300`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </td>
            <td className="border-b border-slate-200 dark:border-slate-800 p-4 text-slate-600 dark:text-slate-300">
              {props.rank}
            </td>
            <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
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
                <span className="text-slate-300 dark:text-slate-600">
                  {" "}
                  {props.symbol}{" "}
                </span>
              </div>
            </td>
            <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
              {currentCurrency === "USD" ? props.priceUsd : props.price}
            </td>
            <td
              className={`${
                props.changePercent24Hr > 0
                  ? "text-green-500 "
                  : "text-red-500 "
              } border-b border-slate-200 dark:border-slate-800 p-4 pr-8 dark:text-slate-400`}
            >
              {" "}
              <div className="flex items-center">
                {getChangePercentIcon(props.changePercent24Hr)}
                {!isNaN(props.changePercent24Hr) &&
                  props.changePercent24Hr + "%"}
              </div>
            </td>
            <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
              {currentCurrency === "USD" ? props.marketCapUsd : props.marketCap}
            </td>
            <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
              {currentCurrency === "USD"
                ? props.volumeUsd24Hr
                : props.volume24Hr}
            </td>
          </tr>
        )}
      </Transition>
    </>
  );
});

export default CurrencyItem;
