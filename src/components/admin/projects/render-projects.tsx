import { FiEdit } from "react-icons/fi";
import { PopulatedProjectsType } from "../../../types/generics.types";
import { Table } from "../../shared/table";

type RenderProjectsTableProps = {
  projects: PopulatedProjectsType[];
  handleEditCredits: (projectId: string) => void;
};

export const RenderProjectsTable = ({
  projects,
  handleEditCredits,
}: RenderProjectsTableProps) => {
  const renderBody = () => {
    return projects.map((project) => ({
      name: (
        <p className="font-semibold cursor-pointer hover:underline">
          {project?.name}
        </p>
      ),
      resources: (
        <p className="font-semibold">{project?.resources?.length || 0}</p>
      ),
      createdby: (
        <p className="font-semibold">
          {project?.createdBy?.email?.split("@")[0] || "N/A"}
        </p>
      ),
      paymentmethods: (
        <p className="font-semibold">{project?.paymentMethods?.length || 0}</p>
      ),
      credits: (
        <div className="flex items-center font-semibold">
          <p className="mr-2">{project?.credit || "N/A"}</p>
          <FiEdit
            className="cursor-pointer hover:text-blue-500"
            onClick={() => handleEditCredits(project._id)}
          />
        </div>
      ),
      created: (
        <p className="font-semibold">
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
      ),
    }));
  };

  const tableData = {
    headers: [
      "Name",
      "Resources",
      "Created By",
      "Payment Methods",
      "Credits",
      "Created",
    ],
    body: renderBody(),
  };

  return (
    <div className="flex w-full overflow-x-auto">
      <Table {...tableData} />
    </div>
  );
};
