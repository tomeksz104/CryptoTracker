import { useRouteError } from "react-router";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found";
    message = "Could not find resource or page";
  }

  return (
    <>
      <div className="flex items-center justify-center overflow-x-hidden">
        <div className="relative mx-auto mb-16 px-6 md:max-w-2xl lg:max-w-5xl lg:px-12">
          <div className="relative z-10 mx-auto text-center">
            <div className="flex justify-center items-center divide-x">
              <div className="w-32 h-32 sm:w-40 sm:h-40 relative z-10 flex justify-center items-center">
                <h1 className="relative font-bold text-white text-5xl sm:text-6xl">
                  {error.status ? error.status : "404"}
                </h1>
              </div>
              <div className="px-4">
                <h1 className="font-bold text-2xl sm:text-3xl text-gray-700 dark:text-white">
                  {title}
                </h1>
                <p className="font-bold text-xl sm:text-2xl text-gray-700 dark:text-white">
                  {message}
                </p>
              </div>
            </div>
            <Link
              to="/"
              onClick={() => navigate(-1)}
              title="Back to safe page"
              aria-label="go back home"
              className="relative mx-auto flex h-11 w-11 items-center justify-center before:absolute before:inset-0 before:rounded-full before:bg-white before:shadow-2xl before:shadow-primary dark:shadow-none dark:before:bg-gray-700 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="relative w-5 h-5 text-sky-500 dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                ></path>
              </svg>
            </Link>
          </div>
          <div
            aria-hidden="true"
            className="absolute left-8 w-40 -rotate-45 h-64 rounded-full -top-16 bg-gradient-to-r from-green-400 via-primaryLight to-purple-400 blur-2xl opacity-60 dark:from-primary/40 dark:via-sky-900 dark:to-indigo-900 dark:opacity-40"
          ></div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
