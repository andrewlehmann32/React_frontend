import { useState } from "react";
import { initialPlan } from "../../constants/constants";
import { Button } from "../ui/button";
import { PlanModal } from "./create-plan";
import { PlansTable } from "./plans-table";

export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plan, setPlan] = useState<any>(initialPlan);
  const [modalType, setModalType] = useState("");

  const handleCreatePlan = () => {
    setIsModalOpen(true);
    setModalType("Create");
  };

  return (
    <>
      <div className="flex items-center justify-between mt-4 mr-6 mb-1">
        <p className="text-xl font-medium">Resource Plans</p>
        <Button onClick={handleCreatePlan}>Create New Plan</Button>
        <PlanModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalType={modalType}
          planData={plan}
          setPlanData={setPlan}
        />
      </div>
      <PlansTable
        setIsModalOpen={setIsModalOpen}
        setModalType={setModalType}
        setPlan={setPlan}
        isModalOpen={isModalOpen}
      />
    </>
  );
};
