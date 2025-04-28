import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/atoms/Spinner";
import { Trash } from "@styled-icons/bootstrap";

interface Props {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  description: string;
  disabled: boolean;
  onClick: () => void;
}

const DeleteModal = ({
  open,
  onOpenChange,
  title,
  description,
  disabled,
  onClick,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <Trash className="mx-auto mb-3" size={40} color="red" />
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4">
          <Button
            disabled={disabled}
            className="bg-red-600 hover:bg-red-500 mx-auto w-32"
            onClick={onClick}
          >
            {disabled ? <Spinner inButton /> : <span>Delete</span>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
