import { ReactNode } from "react";
import { mergeClasses } from "../../../lib/helpers/utils";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

type ModalProps = {
  title: string;
  description?: string;
  onSave?: () => void;
  buttonIcon?: ReactNode;
  children?: ReactNode;
  button?: boolean;
  actionButtonStyles?: string;
  actionButtonText: string;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

const defaultButtonStyles =
  "text-gray-500 text-sm font-medium hover:bg-gray-100 active:scale-90 rounded-sm py-2 px-3 bg-white shadow-none";

export const Modal = ({
  title,
  description,
  onSave,
  children,
  actionButtonStyles,
  actionButtonText,
  setIsOpen,
  isOpen,
  button = true,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-medium">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className=" py-1">{children}</div>
        <DialogFooter>
          {button && (
            <Button
              type="button"
              onClick={onSave}
              className={mergeClasses(defaultButtonStyles, actionButtonStyles)}
            >
              {actionButtonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
