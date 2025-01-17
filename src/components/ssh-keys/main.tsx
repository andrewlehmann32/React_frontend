import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { environment } from "../../config/environment";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setActiveProject } from "../../redux/reducer/userSlice";
import { selectActiveProject } from "../../redux/selectors/userSelector";
import { Modal } from "../shared/popups/modal-box";
import { Table } from "../shared/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
const token = localStorage.getItem("token");

const AddKey = ({ currentProject }: { currentProject: any }) => {
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
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        },
        data: {
          name,
          key: sshKey,
          projectId: currentProject._id,
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
    } catch (error) {
      console.error("Error saving SSH Key:", error);
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
  return (
    <div className="py-2 gap-4 flex flex-col pr-0 lg:pr-6 w-full">
      <AddKey currentProject={currentProject} />
      <ListKeys sshKeys={currentProject?.sshKeys} />
    </div>
  );
};
