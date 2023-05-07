import { useState } from "react";

import Chart from "./Chart";
import PageContent from "../Layout/PageContent";

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleChangeTab = (tab) => () => {
    setActiveTab(tab);
  };

  let tab;
  if (activeTab === "tab1") {
    tab = <Chart cryptocurrency={props.cryptocurrency} />;
  } else if (activeTab === "tab2") {
    tab = "markets";
  }

  const activeTabClasses =
    "inline-block px-4 py-3 rounded-lg text-white bg-sky-500 cursor-pointer";
  const tabClasses =
    "inline-block px-4 py-3 rounded-lg hover:text-slate-900 hover:bg-slate-400/20 dark:hover:text-white cursor-pointer";

  return (
    <>
      <div className="border-y border-gray-100 dark:border-gray-700">
        <PageContent classes="my-3">
          <ul className="flex flex-wrap text-sm font-medium text-center text-slate-500 dark:text-slate-400">
            <li className="mr-2">
              <span
                onClick={handleChangeTab("tab1")}
                className={activeTab === "tab1" ? activeTabClasses : tabClasses}
                aria-current="page"
              >
                Overview
              </span>
            </li>
            <li className="mr-2">
              <span
                onClick={handleChangeTab("tab2")}
                className={activeTab === "tab2" ? activeTabClasses : tabClasses}
              >
                Markets
              </span>
            </li>
          </ul>
        </PageContent>
      </div>
      <PageContent>{tab}</PageContent>
    </>
  );
};

export default Tabs;
