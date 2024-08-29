"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
  venueId: z.string().min(1, "Please select a venue"),
});

type FormData = z.infer<typeof formSchema>;

type Venue = {
  id: string;
  name: string;
};

export default function ReportForm() {
  const router = useRouter();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issue: "",
      detail: "",
      venueId: "",
    },
  });

  useEffect(() => {
    setLoading(true);
    fetch("/api/venues")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched venues:", data);
        setVenues(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching venues:", error);
        setError("Failed to load venues. Please try again later.");
        setLoading(false);
      });
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form data:", data);
    try {
      const response = await fetch("/api/report-venue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date: data.datetime.toISOString().split("T")[0],
          time: data.datetime.toTimeString().split(" ")[0],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit report");
      }

      const result = await response.json();
      console.log("Report submitted successfully:", result);
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting report:", error);
      setError("Failed to submit report. Please try again.");
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
          name="venueId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Venue</FormLabel>
              {loading ? (
                <p>Loading venues...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a venue" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {venues.map((venue) => (
                        <SelectItem key={venue.id} value={venue.id}>
                          {venue.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

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

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
