import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import usePrevious from "../../hooks/usePrevious";
import { Transition } from "react-transition-group";
import { currencyActions } from "../../store/currency-slice";
import { Link } from "react-router-dom";
import CurrencyContext from "../../store/currecy-context";

import empty from "../../assets/cryptocurrency-icons/empty.svg";
import { ReactComponent as CaretDown } from "../../assets/svg/caret-down.svg";
import { ReactComponent as CaretUp } from "../../assets/svg/caret-up.svg";

import "./CurrencyItem.css";

const DURATION = 300;

const CurrencyItem = React.memo((props) => {
  const currencyCtx = useContext(CurrencyContext);
  const dispatch = useDispatch();
  const prevData = usePrevious(props);
  const watchlist = useSelector((state) => state.currency.watchlist);
  const [animation, setAnimation] = useState(null);
  const [show, setShow] = useState(false);

  const imgRef = useRef(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const importedIcon = await import(
          `../../../node_modules/cryptocurrency-icons/svg/color/${props.cryptocurrency.symbol.toLowerCase()}.svg`
        );
        imgRef.current.src = importedIcon.default;
      } catch (error) {
        imgRef.current.src = empty;
      }
    };
    fetchSvg();
  }, [props.cryptocurrency.symbol]);

  useEffect(() => {
    let animate = animation;
    let shouldShow = false;

    if (prevData) {
      if (props.cryptocurrency.priceUsd > prevData.cryptocurrency.priceUsd) {
        shouldShow = true;
        animate = "up";
        resetAnimation();
      } else if (
        props.cryptocurrency.priceUsd < prevData.cryptocurrency.priceUsd
      ) {
        shouldShow = true;
        animate = "down";
        resetAnimation();
      }
    }

    setAnimation(animate);
    setShow(shouldShow);
  }, [props.cryptocurrency.priceUsd, prevData, animation]);

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
    if (watchlist.includes(props.cryptocurrency.symbol)) {
      dispatch(
        currencyActions.removeFromWatchlist({
          currency: {
            symbol: props.cryptocurrency.symbol,
          },
        })
      );
    } else {
      dispatch(
        currencyActions.addToWatchlist({
          currency: {
            symbol: props.cryptocurrency.symbol,
          },
        })
      );
    }
  }, [dispatch, watchlist, props.cryptocurrency.symbol]);

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
                  watchlist.includes(props.cryptocurrency.symbol)
                    ? "text-amber-500"
                    : ""
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
              {props.cryptocurrency.rank}
            </td>
            <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
              <Link
                to={`/cryptocurrency/${props.cryptocurrency.id}`}
                className="flex items-center space-x-2"
              >
                <img
                  ref={imgRef}
                  src={empty}
                  alt={`Logo ${props.cryptocurrency.name}`}
                  width={32}
                  height={32}
                  className="mr-2"
                />
                {props.cryptocurrency.name}
                <span className="text-slate-300 dark:text-slate-600">
                  {" "}
                  {props.cryptocurrency.symbol}{" "}
                </span>
              </Link>
            </td>
            <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
              {props.cryptocurrency.price}
            </td>
            <td
              className={`${
                props.cryptocurrency.changePercent24Hr > 0
                  ? "text-green-500 "
                  : "text-red-500 "
              } border-b border-slate-200 dark:border-slate-800 p-4 pr-8 dark:text-slate-400`}
            >
              {" "}
              <div className="flex items-center">
                {getChangePercentIcon(props.cryptocurrency.changePercent24Hr)}
                {!isNaN(props.cryptocurrency.changePercent24Hr) &&
                  props.cryptocurrency.changePercent24Hr + "%"}
              </div>
            </td>
            <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
              {props.cryptocurrency.marketCap}
            </td>
            <td className="border-b border-slate-200 dark:border-slate-800 p-4 pr-8 text-slate-600 dark:text-slate-300">
              {props.cryptocurrency.volume24Hr}
            </td>
          </tr>
        )}
      </Transition>
    </>
  );
});

export default CurrencyItem;
