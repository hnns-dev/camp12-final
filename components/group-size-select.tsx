import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GroupSizeSelectProps = {
  groupSizes: number[];
<<<<<<< HEAD
  onChange: (value: string) => {}; // Changed to number
  value: string;
=======
  onChange?: (value: string) => void;
>>>>>>> eed4fed27b9e4aa4b4c7ff5ce500adb9fc0e54ba
  placeholder?: string;
};

export default function GroupSizeSelect({
  groupSizes,
  onChange,
  placeholder = "Select group size",
}: GroupSizeSelectProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="min-w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {groupSizes.map((size) => (
          <SelectItem key={size} value={size.toString()}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
