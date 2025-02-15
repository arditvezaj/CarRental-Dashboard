import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/atoms/Input";
import Spinner from "@/components/atoms/Spinner";
import { useCreateCompanyMutation } from "@/redux/services/companies/api";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Label from "@/components/atoms/Label";
// import { cloudinaryUpload } from "@/utils/cloudinaryService";

interface CompanyAddFormProps {
  open: boolean;
  setShowCompanyAddForm: (isOpen: boolean) => void;
}

const FormSchemaNewCompany = z.object({
  name: z.string({
    required_error: "Required",
  }),
});

const CompanyAddModalForm = ({
  open,
  setShowCompanyAddForm,
}: CompanyAddFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const formAddCompany = useForm<z.infer<typeof FormSchemaNewCompany>>({
    resolver: zodResolver(FormSchemaNewCompany),
    defaultValues: {
      name: "",
    },
  });

  const {
    reset,
    formState: { isSubmitted, dirtyFields },
  } = formAddCompany;

  const [addCompany, { isLoading: isAddingCompany }] =
    useCreateCompanyMutation();

  const closeCompanyAddForm = () => {
    setShowCompanyAddForm(false);
    reset({});
    setErrorMessage("");
  };

  const onSubmitNewCompany = async (
    values: z.infer<typeof FormSchemaNewCompany>
  ) => {
    try {
      // const logoUrl = await cloudinaryUpload(file, "logos");
      const logoUrl = "logoUrl";

      const data = {
        name: values.name,
        logo: logoUrl,
      };

      await addCompany(data).unwrap();

      closeCompanyAddForm();
    } catch (error: any) {
      setErrorMessage(error.data.message);
      console.error("Company failed:", error);
    }
  };

  const requiredFields = () => {
    const requiredFields = ["name"];

    return requiredFields.every(
      (fieldName) => dirtyFields[fieldName as keyof typeof dirtyFields]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setShowCompanyAddForm}>
      <DialogContent className="sm:max-w-[600px]">
        <form
          onSubmit={formAddCompany.handleSubmit(onSubmitNewCompany)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <DialogHeader>
            <DialogTitle>Add New Company</DialogTitle>
          </DialogHeader>
          <div className="py-4 flex flex-col mb-6 gap-5">
            <Form {...formAddCompany}>
              <div>
                <Label>Logo</Label>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="flex items-center"
                />
              </div>
              <FormField
                control={formAddCompany.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </Form>
          </div>
          <DialogFooter className="flex flex-col gap-3 md:gap-1">
            <Button
              type="submit"
              disabled={isAddingCompany || !requiredFields()}
            >
              {isAddingCompany ? <Spinner inButton /> : <span>Add</span>}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={closeCompanyAddForm}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyAddModalForm;
