import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import MainNavigation from "./Navbar/MainNavigation";
import Footer from "./Footer";
import Notification from "../UI/Notification";

const RootLayout = () => {
  const notification = useSelector((state) => state.ui.notification);

  return (
    <>
      <MainNavigation />
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
        />
      )}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
