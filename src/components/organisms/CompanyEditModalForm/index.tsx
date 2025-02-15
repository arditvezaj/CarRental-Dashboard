import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useLazyGetCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyLogoMutation,
} from "@/redux/services/companies/api";
import Label from "@/components/atoms/Label";
// import { cloudinaryUpload } from "@/utils/cloudinaryService";

interface CompanyAddFormProps {
  companyId: string | null;
  publicId: string;
  open: boolean;
  setShowCompanyEditForm: (isOpen: boolean) => void;
}

const FormSchemaNewCompany = z.object({
  name: z.string({
    required_error: "Required",
  }),
  logo: z.string({
    required_error: "Required",
  }),
});

const CompanyEditModalForm = ({
  companyId,
  publicId,
  open,
  setShowCompanyEditForm,
}: CompanyAddFormProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const formEditCompany = useForm<z.infer<typeof FormSchemaNewCompany>>({
    resolver: zodResolver(FormSchemaNewCompany),
    defaultValues: {
      name: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [trigger, result] = useLazyGetCompanyQuery();
  const [updateCompany, { isLoading: isEditing }] = useUpdateCompanyMutation();
  const [deleteCompanyLogo] = useDeleteCompanyLogoMutation();

  const { data: company, isLoading } = result;

  const {
    reset,
    formState: { dirtyFields },
  } = formEditCompany;

  useEffect(() => {
    if (companyId) {
      trigger(companyId);
    }
  }, [companyId, trigger]);

  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
        logo: company.logo,
      });
    }
  }, [company, reset]);

  const onSubmitNewCompany = async (
    values: z.infer<typeof FormSchemaNewCompany>
  ) => {
    try {
      const logoUrl = "logoUrl";
        // file !== null ? await cloudinaryUpload(file, "logos") : values.logo;

      const data = {
        name: values.name,
        logo: logoUrl,
      };

      await updateCompany({ id: companyId, ...data }).unwrap();

      setShowCompanyEditForm(false);

      if (publicId) await deleteCompanyLogo(publicId);
    } catch (error: any) {
      setErrorMessage(error.data.message);
      console.error("Company failed:", error);
    }
  };

  const closeCompanyAddForm = () => {
    setShowCompanyEditForm(false);
    reset({});
    setErrorMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={setShowCompanyEditForm}>
      <DialogContent className="sm:max-w-[600px]">
        <form
          onSubmit={formEditCompany.handleSubmit(onSubmitNewCompany)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <DialogHeader>
            <DialogTitle>Unternehme Bearbeiten</DialogTitle>
          </DialogHeader>
          <div className="py-4 flex flex-col mb-6 gap-5">
            <Form {...formEditCompany}>
              <div>
                <Label>Logo</Label>
                <Input type="file" onChange={handleFileChange} />
              </div>
              <FormField
                control={formEditCompany.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name eingeben" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </Form>
          </div>
          <DialogFooter className="flex flex-col gap-3 md:gap-1">
            {isEditing ? (
              <Spinner inButton />
            ) : (
              <Button type="submit" disabled={isEditing}>
                Änderungen speichern
              </Button>
            )}
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

export default CompanyEditModalForm;
