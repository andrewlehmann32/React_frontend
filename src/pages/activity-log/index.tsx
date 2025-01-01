import AppLayout from "../../components/layouts/appLayout";
import { PageLayout } from "../../components/layouts/pageLayout";
import { Main } from "../../components/activity/main";

const Activity = () => {
  return (
    <AppLayout>
      <PageLayout>
        <Main />
      </PageLayout>
    </AppLayout>
  );
};

export default Activity;
