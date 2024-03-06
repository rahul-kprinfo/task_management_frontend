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
  styles: string;
  customOnChange: any;
  defaultVal?: any;
}

const UCustomSelect = ({
  placeholder,
  options,
  styles,
  customOnChange,
  defaultVal,
}: MyComponentProps) => {
  console.log("defaultVal", defaultVal);
  return (
    <Select
      onValueChange={(e) => {
        {
          const values = options?.find((val: any) => {
            return val?.value === e;
          });
          customOnChange(values);
        }
      }}
      value={defaultVal}
    >
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

export default UCustomSelect;
