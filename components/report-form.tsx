import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DateTimePicker } from "./date-time-picker";

export default function ReportForm() {
  return (
    <>
      <div className="flex flex-col m-3 text-sm gap-2">
        <p>What is wrong with this venue?</p>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose an issue" />
          </SelectTrigger>
          <SelectContent className="bg-white p-3">
            <SelectGroup>
              <SelectItem value="net">no net/net damaged</SelectItem>
              <SelectItem value="surface">Surface severly damaged</SelectItem>
              <SelectItem value="uneven">surface uneven</SelectItem>
              <SelectItem value="edges">chipped edges</SelectItem>
              <SelectItem value="safety">
                safety hazards - please specify below
              </SelectItem>
              <SelectItem value="other">
                other - please specify below
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col m-3 text-sm gap-2">
        {/* Or shouldn't it be just the date&time of the report automatically? */}
        <p>When did you see the problem?</p>
        <DateTimePicker />
      </div>
      <div className="flex flex-col m-3 text-sm gap-2">
        <p>Do you have more details to report?</p>
        <Input placeholder="Type in details"></Input>
      </div>
    </>
  );
}
