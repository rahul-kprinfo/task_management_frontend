import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface MyComponentProps {
  placeholder: string;
  options: any; // Optional prop
  styles?: string;
  customOnChange: any;
  defaultVal?: any;
}

const CustomSelect = ({
  placeholder,
  options,
  styles,
  customOnChange,
  defaultVal,
}: MyComponentProps) => {
  return (
    <Select onValueChange={(e) => customOnChange(e)} value={defaultVal}>
      <SelectTrigger className={styles}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options?.map((option: any) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
