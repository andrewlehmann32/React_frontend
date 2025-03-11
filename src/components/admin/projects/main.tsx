import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { environment } from "../../../config/environment";
import { PopulatedProjectsType } from "../../../types/generics.types";
import { CreditsModal } from "../../shared/modals/credits-modal";
import { RenderProjectsTable } from "./render-projects";

const token = localStorage.getItem("token");

export const Main = () => {
  const [projects, setProjects] = useState<PopulatedProjectsType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [newCredits, setNewCredits] = useState("");

  useEffect(() => {
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

    fetchProjects();
  }, []);

  const handleEditCredits = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  const handleSaveCredits = async () => {
    if (!selectedProjectId) return;
    const credits = (getSelectedProject() ?? 0) + Number(newCredits);
    try {
      const response = await axios.put(
        `${environment.VITE_API_URL}/projects/update-project/${selectedProjectId}`,
        { credit: credits },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 && response.data?.project) {
        toast.success("Credits added successfully");
      }
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === selectedProjectId
            ? { ...project, credit: Number(credits) }
            : project
        )
      );
      setNewCredits("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating credits:", error);
    }
  };

  const getSelectedProject = () => {
    return projects.find((project) => project._id === selectedProjectId)
      ?.credit;
  };

  return (
    <>
      <h1 className="font-semibold">Projects</h1>
      <RenderProjectsTable
        projects={projects}
        handleEditCredits={handleEditCredits}
      />
      <CreditsModal
        availableCredits={getSelectedProject() ?? 0}
        credits={newCredits}
        handleSave={handleSaveCredits}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        setCredits={setNewCredits}
      />
    </>
  );
};
