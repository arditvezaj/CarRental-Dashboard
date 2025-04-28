import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/atoms/Input";
import z from "zod";
import Label from "@/components/atoms/Label";
import FormSchemaUser from "./FormSchemaUser";
import { UseFormReturn } from "react-hook-form";

interface TypeProps {
  label: string;
  value: string;
}

interface Props {
  formAddUser: UseFormReturn<z.infer<typeof FormSchemaUser>>;
  // handlePhotoChange: (
  //   field: string
  // ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
}
const AddUserForm = ({
  formAddUser,
  // handlePhotoChange,
  errorMessage,
}: Props) => {
  return (
    <Form {...formAddUser}>
      <FormField
        control={formAddUser.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name Surname</FormLabel>
            <FormControl>
              <Input placeholder="Enter Name and Surname" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formAddUser.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>E-Mail Address</FormLabel>
            <FormControl>
              <Input placeholder="Enter E-Mail Address" {...field} />
            </FormControl>
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={formAddUser.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter Password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formAddUser.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter Phone Number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formAddUser.control}
        name="birthDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="col-span-2">Birthday</FormLabel>
            <FormControl>
              <div>
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formAddUser.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="overflow-y-auto max-h-[13rem]">
                <SelectItem className="cursor-pointer" value="admin">
                  Admin
                </SelectItem>
                <SelectItem className="cursor-pointer" value="arbeiter">
                  User
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <div>
        <Label>Profile Photo</Label>
        <Input type="file" onChange={handlePhotoChange("profilePhoto")} />
      </div>
      <div>
        <Label>ID</Label>
        <Input type="file" onChange={handlePhotoChange("cardFront")} />
      </div> */}
    </Form>
  );
};

export default AddUserForm;
