import { PageLayout } from "../../components/layouts/pageLayout";
import { Main } from "../../components/resources/main";
import { ServersList } from "../../components/resources/servers-list";

const Resources = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <ServersList />
      <div className="w-[100%] lg:w-[76%] xl:w-[73%]">
        <PageLayout>
          <Main />
        </PageLayout>
      </div>
    </div>
  );
};

export default Resources;
