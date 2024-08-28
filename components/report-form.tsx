"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Textarea } from "./ui/textarea";

export default function ReportForm() {
  const [issue, setIssue] = useState("");
  const [datetime, setDatetime] = useState<Date | null>(null);
  const [detail, setDetail] = useState("");
  const router = useRouter();

  const venueId = "920521f5-37a2-46ac-9e03-304763998903";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!datetime) {
      console.error("Datetime is not set");
      return;
    }
    const response = await fetch("/api/report-venue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        issue,
        date: datetime.toISOString().split("T")[0],
        time: datetime.toTimeString().split(" ")[0],
        detail,
        venueId,
      }),
    });

    if (response.ok) {
      router.push("/thank-you");
    } else {
      console.error("Failed to submit report");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-10">
      <div className="flex flex-col m-3 text-sm gap-7">
        <p className="font-semibold">What is wrong with this venue?</p>
        <Select onValueChange={setIssue}>
          <SelectTrigger>
            <SelectValue placeholder="Choose an issue" />
          </SelectTrigger>
          <SelectContent className="bg-white p-3">
            <SelectGroup>
              <SelectItem value="net">no net/net damaged</SelectItem>
              <SelectItem value="surface">Surface severely damaged</SelectItem>
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
        <p className="font-semibold">When did you see the problem?</p>
        <div className="custom-date-time-picker [&_[id$='-description']]:hidden [&_button[type='submit']]:hidden">
          <DateTimePicker onDateTimeChange={setDatetime} />
        </div>
      </div>
      <div className="flex flex-col m-3 text-sm gap-7">
        <p className="font-semibold">Do you have more details to report?</p>
        <Textarea
          placeholder="Type in details"
          className="h-20"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDetail(e.target.value)
          }
        ></Textarea>
      </div>
      <Button type="submit" className="m-5">
        Report
      </Button>
    </form>
  );
}
