import { defer } from "react-router";
//import HeatMap from "../features/HeatMap/HeatMap";
import PageContent from "../components/Layout/PageContent";
import Header from "../features/HeatMap/Header";
import { Suspense, lazy } from "react";

const HeatMap = lazy(() => import("../features/HeatMap/HeatMap"));
const HeatMapPage = () => {
  return (
    <PageContent>
      <Header />
      <Suspense fallback="">
        <HeatMap />
      </Suspense>
    </PageContent>
  );
};

export default HeatMapPage;

const loadCryptocurrencies = async () => {
  const response = await fetch("https://api.coincap.io/v2/assets?limit=100");

  const { data } = await response.json();

  return data;
};

export async function loader({ request, params }) {
  return defer({
    cryptocurrencies: await loadCryptocurrencies(),
  });
}
