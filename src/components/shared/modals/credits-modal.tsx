import { Modal } from "../popups/modal-box";

type CreditsModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  credits: string;
  setCredits: (value: string) => void;
  availableCredits: number;
  handleSave: () => void;
};

export const CreditsModal = ({
  handleSave,
  isOpen,
  credits,
  setIsOpen,
  setCredits,
  availableCredits,
}: CreditsModalProps) => {
  return (
    <Modal
      title="Credits"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onSave={handleSave}
      actionButtonText="Save"
      actionButtonStyles="w-full border text-white bg-gray-800 hover:text-gray-800"
    >
      <div className="flex flex-col gap-3">
        <p className="text-xs text-gray-500 font-medium">
          Available Credits:{" "}
          <span className="font-semibold">{availableCredits}</span>
        </p>
        <div className="flex flex-wrap gap-3 items-start">
          <p className="text-gray-700 text-sm font-medium pt-1">
            Enter New Credits
          </p>
          <div className="flex flex-col flex-wrap w-1/2 gap-1">
            <input
              type="text"
              className="border rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter credits"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
            />
            <label className="text-xs text-gray-500">
              Enter new credits to be replaced with the current credits. In
              order to make it zero simply enter 0.
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};
