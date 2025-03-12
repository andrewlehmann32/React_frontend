import { useState } from "react";
import toast from "react-hot-toast";
import { environment } from "../../config/environment";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import axios from "../../lib/apiConfig";
import { setActiveProject } from "../../redux/reducer/userSlice";
import {
  selectActiveProject,
  selectUser,
} from "../../redux/selectors/userSelector";
import { Modal } from "../shared/popups/modal-box";
import { Table } from "../shared/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AddKey = ({
  currentProject,
  dcimUserId,
}: {
  currentProject: any;
  dcimUserId: number;
}) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [sshKey, setSshKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchKeys = async () => {
    try {
      const config = {
        url: `${environment.VITE_API_URL}/projects/${currentProject._id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        dispatch(setActiveProject(response.data.project));
      }
    } catch (error) {
      console.error("Error fetching SSH Key:", error);
    }
  };

  const handleSaveKey = async () => {
    if (!name.length || !sshKey.length || !currentProject?._id) return;
    try {
      const config = {
        url: `${environment.VITE_API_URL}/projects/ssh`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name,
          key: sshKey,
          projectId: currentProject._id,
          dcimUserId: dcimUserId,
        },
      };
      const response = await axios(config);

      if (response.status === 201) {
        toast.success("SSH Key saved successfully");
        fetchKeys();
        setName("");
        setSshKey("");
        setIsModalOpen(false);
      }
    } catch (error: any) {
      console.error("Error creating SSH Key:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-medium py-1">SSH Keys</h1>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="text-gray-500 text-sm font-medium hover:bg-gray-100 active:scale-90 rounded-sm py-2 px-3 bg-white shadow-none"
      >
        + Add SSH Key
      </Button>
      <Modal
        title="SSH Key"
        onSave={handleSaveKey}
        actionButtonText="Save Key"
        actionButtonStyles="w-full border"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2 ">
            <Label className="text-gray-500">Name</Label>
            <Input
              placeholder="Name"
              className="px-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <Label className="text-gray-500">SSH Key Content</Label>
            <textarea
              placeholder="Public SSH Key"
              className="px-4 border rounded-md py-3 text-sm"
              rows={5}
              value={sshKey}
              onChange={(e) => setSshKey(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const ListKeys = ({ sshKeys }: any) => {
  const tableData = {
    headers: ["Name", "SSH Key", "Created", "ID"],
    body: sshKeys?.length
      ? sshKeys.map((key: any) => ({
          name: key.name,
          sshkey: key.key,
          created: new Date(key.createdAt).toLocaleDateString(),
          id: key._id,
        }))
      : [],
  };

  return (
    <div className="flex w-full overflow-x-auto">
      <Table {...tableData} />
    </div>
  );
};

export const Main = () => {
  const currentProject = useAppSelector(selectActiveProject);
  const { user } = useAppSelector(selectUser);
  if (!user || !currentProject)
    return (
      <div className="flex justify-center items-center pt-20 ">
        <p className="text-gray-600 font-medium text-xl">
          You need to create a project first
        </p>
      </div>
    );
  return (
    <div className="py-2 gap-4 flex flex-col pr-0 lg:pr-6 w-full">
      <AddKey currentProject={currentProject} dcimUserId={user.dcimUserId} />
      <ListKeys sshKeys={currentProject?.sshKeys} />
    </div>
  );
};
