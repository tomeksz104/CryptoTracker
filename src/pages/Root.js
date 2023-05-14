import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import MainNavigation from "../components/Layout/MainNavigation";
import Footer from "../components/Layout/Footer";
import Notification from "../components/UI/Notification";

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
