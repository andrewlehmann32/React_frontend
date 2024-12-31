import AppLayout from "../../components/layouts/appLayout";
import { PageLayout } from "../../components/layouts/pageLayout";
import { Main } from "../../components/billing/main";

const Billing = () => {
  return (
    <AppLayout>
      <PageLayout>
        <Main />
      </PageLayout>
    </AppLayout>
  );
};

export default Billing;
