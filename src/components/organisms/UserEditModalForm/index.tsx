import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
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

// import {
//   useLazyGetUserQuery,
//   useUpdateUserMutation,
//   useDeleteUserImageMutation,
// } from "@/redux/services/users/api";
import AddUserForm from "../UserAddModalForm/AddUserForm";
import FormSchemaUser from "../UserAddModalForm/FormSchemaUser";
import { formData } from "../UserAddModalForm/formData";

interface UserAddFormProps {
  userId: string | null;
  open: boolean;
  setShowUserEditForm: (isOpen: boolean) => void;
}

const UserEditModalForm = ({
  userId,
  open,
  setShowUserEditForm,
}: UserAddFormProps) => {
  // const [deleteUserImage] = useDeleteUserImageMutation();

  const [originalPhotos, setOriginalPhotos] = useState<{
    [key: string]: string | null;
  }>({
    profilePhoto: null,
    cardFront: null,
    cardBack: null,
    signature: null,
    ahvCard: null,
  });

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

        if (originalPhotos[key] && originalPhotos[key] !== url) {
          const publicId = originalPhotos[key]
            ?.replace(/^.*\/(?:v[0-9]+\/)?/, "")
            .replace(/\.[^/.]+$/, "");

          if (publicId) {
            // await deleteUserImage(publicId);
          }
        }
      }
    };

  const formEditUser = useForm<z.infer<typeof FormSchemaUser>>({
    resolver: zodResolver(FormSchemaUser),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      birthDate: undefined,
      phoneNumber: "",
      ahv: "",
      residenceDate: undefined,
      residenceType: "",
      profilePhoto: "",
      cardFront: "",
      cardBack: "",
      signature: "",
      ahvCard: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  // const [trigger, result] = useLazyGetUserQuery();
  // const [updateUser, { isLoading: isEditing }] = useUpdateUserMutation();

  // const { data: user, isLoading } = result;

  const {
    reset,
    formState: { dirtyFields },
  } = formEditUser;

  // useEffect(() => {
  //   if (userId) {
  //     trigger(userId);
  //   }
  // }, [userId, trigger]);

  // useEffect(() => {
  //   if (user) {
  //     reset({
  //       name: user.name || "",
  //       email: user.email || "",
  //       password: user.password || "",
  //       birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
  //       phoneNumber: user.phoneNumber || "",
  //       ahv: user.ahv || "",
  //       role: user.role || "",
  //       residenceDate: user.residenceDate
  //         ? new Date(user.residenceDate)
  //         : undefined,
  //       residenceType: user.residenceType || "",
  //       userType: user.userType || "",
  //       salaryType: user.salaryType || "",
  //       state: user.state || "",
  //       place: user.place || "",
  //       street: user.street || "",
  //       notes: user.notes || "",
  //       profilePhoto: user.profilePhoto || "",
  //       cardFront: user.cardFront || "",
  //       cardBack: user.cardBack || "",
  //       signature: user.signature || "",
  //       ahvCard: user.ahvCard || "",
  //     });

  //     setOriginalPhotos({
  //       profilePhoto: user.profilePhoto,
  //       cardFront: user.cardFront,
  //       cardBack: user.cardBack,
  //       signature: user.signature,
  //       ahvCard: user.ahvCard,
  //     });
  //   }
  // }, [user, reset]);

  const onSubmitNewUser = async (
    values: z.infer<typeof FormSchemaUser>
  ) => {
    try {
      const data = formData({ values, photos });

      // await updateUser({ id: userId, ...data }).unwrap();

      setShowUserEditForm(false);
    } catch (error: any) {
      setErrorMessage(error.data.message);
      console.error("User failed:", error);
    }
  };

  const closeUserAddForm = () => {
    setShowUserEditForm(false);
    reset({});
    setErrorMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={setShowUserEditForm}>
      <DialogContent className="sm:max-w-[900px]">
        <form
          onSubmit={formEditUser.handleSubmit(onSubmitNewUser)}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto h-[90vh]"
        >
          <DialogHeader>
            <DialogTitle>Mitarbeiter Bearbeiten</DialogTitle>
          </DialogHeader>
          <div className="py-4 grid grid-cols-2 md:h-auto md:grid-cols-4 gap-5">
            <AddUserForm
              formAddUser={formEditUser}
              handlePhotoChange={handlePhotoChange}
              errorMessage={errorMessage}
            />
          </div>
          <DialogFooter>
            <Button type="submit">
              {/* {isEditing ? (
                <Spinner inButton />
              ) : (
                <span>Änderungen speichern</span>
              )} */}
              <span>Änderungen speichern</span>
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

export default UserEditModalForm;
