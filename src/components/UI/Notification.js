import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import PageContent from "../Layout/PageContent";

const Notification = (props) => {
  const dispatch = useDispatch();

  const handleCloseNotification = () => {
    dispatch(uiActions.clearNotification());
  };

  return (
    <PageContent>
      <div className="bg-red-50 dark:bg-slate-800 rounded-md p-4">
        <div className="flex">
          <div className="shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5 text-red-400"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="flex ml-3">
            <h3 className="text-sm leading-5 font-medium text-red-800 dark:text-red-400">
              {props.title}
            </h3>
            <span className="ml-3 text-sm leading-5 text-red-700 dark:text-red-400/80">
              {props.message}
            </span>
          </div>
          <button
            onClick={handleCloseNotification}
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-slate-800 dark:text-red-400 dark:hover:bg-slate-700"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </PageContent>
  );
};

export default Notification;
