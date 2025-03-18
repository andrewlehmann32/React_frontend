import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { environment } from "../../../config/environment";
import { useAppDispatch } from "../../../hooks/redux";
import { formatTimestamp } from "../../../lib/helpers/utils";
import {
  loadUser,
  setImpersonatedUser,
  setImpersonationToken,
} from "../../../redux/reducer/userSlice";
import { User } from "../../../types/generics.types";
import { Table } from "../../shared/table";
import { Button } from "../../ui/button";
import axios, { setAuthHeader } from "./../../../lib/apiConfig";

export const Main = () => {
  const [clients, setClients] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleImpersonation = async (userId: string) => {
    try {
      const response = await axios.post(
        `${environment.VITE_API_URL}/admin/impersonate/${userId}`
      );

      if (response.data.impersonationToken) {
        const { impersonationToken, impersonationId, user } = response.data;
        localStorage.setItem("token", impersonationToken);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("id", impersonationId);
        setAuthHeader(impersonationToken);
        dispatch(setImpersonationToken(impersonationToken));
        dispatch(setImpersonatedUser(user));
        dispatch(loadUser(user));
        setTimeout(() => navigate("/home"), 200);
      }
    } catch (error) {
      console.error("Error starting impersonation:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${environment.VITE_API_URL}/user/`);
      if (response?.data?.users) {
        const filteredClients = response?.data?.users.filter(
          (user: User) => user.role === "user"
        );
        setClients(filteredClients);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const tableData = {
    headers: [
      "User",
      "dcim user id",
      "Email",
      "Projects",
      "Created At",
      "Actions",
    ],
    body: clients.map((member) => ({
      user: (
        <div className="flex gap-3 items-center">
          <img
            src={member?.avatar?.url}
            alt={member?.email}
            className="h-7 w-7 rounded-full"
          />
        </div>
      ),
      dcimuserid: (
        <p className="font-semibold">{member?.dcimUserId || "N/A"}</p>
      ),
      email: <p className="font-semibold">{member?.email}</p>,
      projects: (
        <p className="font-semibold">{member?.projects?.length || 0}</p>
      ),
      createdat: formatTimestamp(member?.createdAt),
      actions: (
        <div className="flex gap-3">
          <Button
            className="text-white text-xs bg-sky-700 p-2 hover:bg-sky-800"
            onClick={() => handleImpersonation(member._id)}
          >
            Impersonate
          </Button>
        </div>
      ),
    })),
  };

  return (
    <>
      <div>Clients</div>
      <div className="flex w-full overflow-x-auto">
        <Table {...tableData} />
      </div>
    </>
  );
};
