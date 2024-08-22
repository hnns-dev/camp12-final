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
import { FormDescription } from "./ui/form";
import { Textarea } from "./ui/textarea";

export default function ReportForm() {
  return (
    <section className="flex flex-col gap-4 m-10">
      <div className="flex flex-col m-3 text-sm gap-7">
        <p className="font-semibold">What is wrong with this venue?</p>
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
      <div className="flex flex-col m-3 text-sm gap-7">
        {/* Or shouldn't it be just the date&time of the report automatically? */}
        <p className="font-semibold">When did you see the problem?</p>
        <div
          className="custom-date-time-picker 
      [&_[id$='-description']]:hidden
       [&_button[type='submit']]:hidden"
        >
          <DateTimePicker />
        </div>
      </div>
      <div className="flex flex-col m-3 text-sm gap-7">
        <p className="font-semibold">Do you have more details to report?</p>
        <Textarea placeholder="Type in details" className="h-20"></Textarea>
      </div>
    </section>
  );
}
