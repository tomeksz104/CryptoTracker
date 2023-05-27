import CurrencyList from "../features/CryptoTracker/Currency/List";
import PaginateWrapper from "../features/CryptoTracker/PaginateWrapper";
import Filters from "../features/CryptoTracker/Filters";
import Header from "../features/CryptoTracker/Header";
import PageContent from "../components/Layout/PageContent";

function CryptoTrackerPage() {
  return (
    <PageContent>
      <Header />
      <Filters />
      <CurrencyList />
      <PaginateWrapper />
    </PageContent>
  );
}

export default CryptoTrackerPage;
