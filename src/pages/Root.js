import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  //const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
