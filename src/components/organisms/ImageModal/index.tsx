import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ImageModalProps {
  open: boolean;
  setShowImageModal: (isOpen: boolean) => void;
  image: string | null;
  title: string;
}

const ImageModal = ({
  open,
  setShowImageModal,
  image,
  title,
}: ImageModalProps) => {
  const closeImageModal = () => {
    setShowImageModal(false);
  };

  return (
    <Dialog open={open} onOpenChange={setShowImageModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col mb-6 gap-5">
          {image ? (
            <Image
              src={image}
              alt="profilbild"
              priority
              width={170}
              height={250}
              className="max-h-[60vh] h-auto w-full rounded-xl"
            />
          ) : (
            <span className="text-center">Kein Foto hochgeladen</span>
          )}
        </div>
        <DialogFooter className="flex flex-col gap-3 md:gap-1">
          <Button type="button" variant="secondary" onClick={closeImageModal}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
