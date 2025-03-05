import axios from "axios";
import { useEffect, useState } from "react";
import { ProjectsType } from "../../types/generics.types";
import { Table } from "../shared/table";

const environment = import.meta.env;
const token = localStorage.getItem("token");

export const Main = () => {
  const [projects, setProjects] = useState<ProjectsType[]>([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${environment.VITE_API_URL}/projects/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects(response.data?.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const renderTableItem = () => {
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
      created: (
        <p className="font-semibold">
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
      ),
    }));
  };

  const tableData = {
    headers: ["Name", "Resources", "Created By", "payment methods", "Created"],
    body: renderTableItem(),
  };

  return (
    <>
      <div>Admin Projects</div>
      <div className="flex w-full overflow-x-auto">
        <Table {...tableData} />
      </div>
    </>
  );
};
