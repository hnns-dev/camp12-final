import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// changed string[] to number[]
type GroupSizeSelectProps = {
  groupSizes: number[];
  onChange: (value: string) => void;
  value: number;
  placeholder?: string;
};

export default function GroupSizeSelect({
  value,
  groupSizes,
  onChange,
  placeholder = "Select group size",
}: GroupSizeSelectProps) {
  return (
    <Select value={value.toString()} onValueChange={onChange}>
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
