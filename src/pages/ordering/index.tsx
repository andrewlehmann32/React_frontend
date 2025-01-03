import AppLayout from "../../components/layouts/appLayout";
import { PageLayout } from "../../components/layouts/pageLayout";
import { Main } from "../../components/ordering/main";

const Ordering = () => {
  return (
    <AppLayout>
      <PageLayout>
        <Main />
      </PageLayout>
    </AppLayout>
  );
};

export default Ordering;
