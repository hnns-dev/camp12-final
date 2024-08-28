"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = z.object({
  issue: z.string().min(1, "Please select an issue"),
  datetime: z.date({
    required_error: "Please select a date and time",
  }),
  detail: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ReportForm() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issue: "",
      detail: "",
    },
  });

  const venueId = "920521f5-37a2-46ac-9e03-304763998903";

  const onSubmit = async (data: FormData) => {
    const response = await fetch("/api/report-venue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        date: data.datetime.toISOString().split("T")[0],
        time: data.datetime.toTimeString().split(" ")[0],
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 m-10"
      >
        <FormField
          control={form.control}
          name="issue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is wrong with this venue?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an issue" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="net">no net/net damaged</SelectItem>
                    <SelectItem value="surface">
                      Surface severely damaged
                    </SelectItem>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>When did you see the problem?</FormLabel>
              <FormControl>
                <DateTimePicker
                  onDateTimeChange={(date) => field.onChange(date)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you have more details to report?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type in details"
                  className="h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="m-5">
          Report
        </Button>
      </form>
    </Form>
  );
}
