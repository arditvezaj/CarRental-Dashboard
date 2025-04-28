import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { de } from "date-fns/locale/de";
import { Calendar } from "@styled-icons/bootstrap";

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

const DatePickerComponent = ({ selected, onChange }: DatePickerProps) => {
  return (
    <DatePicker
      className="w-full p-[7px] pl-2.5 border border-gray-300 rounded-md "
      selected={selected}
      onChange={onChange}
      dateFormat="dd.MM.yyyy"
      locale={de}
      placeholderText="Choose date"
    />
  );
};

export default DatePickerComponent;
