import { useAppSelector } from "../../hooks/redux";
import { selectActiveProject } from "../../redux/selectors/userSelector";
import { ToggleButton } from "../shared/buttons/buttons";
import { Button } from "../ui/button";
import { ListTeamMembers } from "./list-teamMates";

export const Main = () => {
  const currentProject = useAppSelector(selectActiveProject);
  return (
    <div className="py-2 gap-4 flex flex-col pr-0 lg:pr-6 w-full">
      <h1 className="text-xl font-medium py-1">Team Members</h1>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="w-full sm:w-9/12 flex gap-3 items-start">
          <ToggleButton />
          <div className="flex flex-col text-xs text-gray-500 gap-1">
            <h5 className="font-medium text-gray-600">
              Enforce Multi Factor Authentication (MFA)
            </h5>
            <p>
              Require MFA from all team members to improve security by using
              multiple authentication methods
            </p>
          </div>
        </div>
        <Button>Invite Members</Button>
      </div>
      <ListTeamMembers currentProject={currentProject} />
    </div>
  );
};
