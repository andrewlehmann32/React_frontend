import axios from "axios";
import toast from "react-hot-toast";
import { environment } from "../../config/environment";
import { formatTimestamp } from "../../lib/helpers/utils";
import { User } from "../../types/generics.types";
import { Button } from "../ui/button";

const token = localStorage.getItem("token");
type ListUsersProps = {
  users: User[];
  projectId: string;
  setModal: (modal: boolean) => void;
};

export const ListUsers = ({ users, projectId, setModal }: ListUsersProps) => {
  // const dispatch = useAppDispatch();
  const sendInvite = async (email: string) => {
    try {
      const config = {
        url: `${environment.VITE_API_URL}/members/sendInvite`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          email,
          projectId,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        setModal(false);
        toast.success("Invitation sent successfully");
        // await fetchAndDispatchProject();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const fetchAndDispatchProject = async () => {
  //   try {
  //     const config = {
  //       url: `${environment.VITE_API_URL}/projects/${projectId}`,
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     const response = await axios(config);
  //     console.info(response);
  //     if (response.status === 200) {
  //       dispatch(setActiveProject(response.data.project));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="flex flex-col gap-4 overflow-scroll">
      {users?.map((user: User, index: number) => (
        <div className="flex justify-between items-center" key={index}>
          <div className="flex items-center gap-3">
            <img
              className="w-7 h-7 rounded-full"
              src={user?.avatar?.url}
              alt=""
            />
            <div className="font-medium text-sm">
              <div>{user?.email?.split("@")[0]}</div>
              <div className="text-xs text-gray-500">
                Joined on {formatTimestamp(user.createdAt)}
              </div>
            </div>
          </div>
          <Button
            className="px-5 active:scale-90"
            onClick={() => sendInvite(user.email)}
          >
            Invite Member
          </Button>
        </div>
      ))}
    </div>
  );
};
