import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GroupSizeSelectProps = {
  groupSizes: number[];
  onChange: (value: string) => {}; // Changed to number
  value: string;
  placeholder?: string;
};

export default function GroupSizeSelect({
  value,
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
