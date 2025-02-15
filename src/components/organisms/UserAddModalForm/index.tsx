import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { formatISO } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/atoms/Spinner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { cloudinaryUpload } from "@/utils/cloudinaryService";

// import { useCreateUserMutation } from "@/redux/services/workers/api";

import FormSchemaNewUser from "./FormSchemaUser";
import AddUserForm from "./AddUserForm";
import { formData } from "./formData";

interface UserAddFormProps {
  open: boolean;
  setShowUserAddForm: (isOpen: boolean) => void;
}

const UserAddModalForm = ({ open, setShowUserAddForm }: UserAddFormProps) => {
  const formAddUser = useForm<z.infer<typeof FormSchemaNewUser>>({
    resolver: zodResolver(FormSchemaNewUser),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      birthDate: undefined,
      phoneNumber: "",
      place: "",
      street: "",
      ahv: "",
      role: "",
      residenceDate: undefined,
      residenceType: "",
      workerType: "",
      salaryType: "",
      notes: "",
      profilePhoto: "",
      cardFront: "",
      cardBack: "",
      signature: "",
      ahvCard: "",
    },
  });

  const {
    reset,
    formState: { isSubmitted, dirtyFields },
  } = formAddUser;

  const [errorMessage, setErrorMessage] = useState("");
  // const [addUser, { isLoading: isAddingUser }] = useCreateUserMutation();

  const closeUserAddForm = () => {
    setShowUserAddForm(false);
    reset({});
    setErrorMessage("");
  };

  const [photos, setPhotos] = useState<{ [key: string]: string | null }>({
    profilePhoto: null,
    cardFront: null,
    cardBack: null,
    signature: null,
    ahvCard: null,
  });

  const handlePhotoChange =
    (key: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];

        // const url = await cloudinaryUpload(file, "mitarbeiter");
        const url = "url";
        setPhotos({
          ...photos,
          [key]: url,
        });
      }
    };

  const onSubmitNewUser = async (values: z.infer<typeof FormSchemaNewUser>) => {
    try {
      const { birthDate, residenceDate } = values;

      birthDate?.setHours(12, 0, 0, 0);
      residenceDate?.setHours(12, 0, 0, 0);

      const formattedBirthDate = formatISO(birthDate);
      const formattedResidenceDate = formatISO(residenceDate);

      const data = formData({
        values,
        photos,
      });

      // await addUser({
      //   birthDate: formattedBirthDate,
      //   residenceDate: formattedResidenceDate,
      //   ...data,
      // }).unwrap();

      closeUserAddForm();
    } catch (error: any) {
      setErrorMessage(error.data.message);
      console.error("User failed:", error);
    }
  };

  const requiredFields = () => {
    const requiredFields = [
      "name",
      "email",
      "password",
      "birthDate",
      "ahv",
      "phoneNumber",
      "residenceDate",
      "residenceType",
    ];

    return requiredFields.every(
      (fieldName) => dirtyFields[fieldName as keyof typeof dirtyFields]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setShowUserAddForm}>
      <DialogContent className="sm:max-w-[800px]">
        <form
          onSubmit={formAddUser.handleSubmit(onSubmitNewUser)}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="py-4 grid grid-cols-2 gap-6">
            <AddUserForm
              formAddUser={formAddUser}
              handlePhotoChange={handlePhotoChange}
              errorMessage={errorMessage}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              // disabled={isAddingUser || !requiredFields()}
            >
              {/* {isAddingUser ? <Spinner inButton /> : <span>Add</span>} */}
              <span>Add</span>
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={closeUserAddForm}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserAddModalForm;
