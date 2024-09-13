"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createVenue, reportVenue } from "@/actions/venues";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActivityType } from "@prisma/client";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, "Please enter a name"),
  activityTypes: z
    .array(z.string().min(1, "Select an activity"))
    .min(1, "Please enter at least one activity"),
  image: z.string().optional(),
  description: z.string().optional(),
  location: z
    .array(z.number())
    .min(2, "location will be inserted automatically"),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateVenueForm({
  activityTypes,
  location,
}: {
  activityTypes: ActivityType[];
  location: number[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      activityTypes: [],
      image: "/signin-hero.jpg",
      location: [],
    },
  });

  useEffect(() => {
    form.setValue("location", location);
  }, [form, location]);

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form data:", data);
    try {
      const result = await createVenue(
        data.name,
        data.activityTypes,
        data.location,
        data.image || "",
        data.description || ""
      );
      console.log("Report submitted successfully:", result);
      router.push("/");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of the venue</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a name, if not sure, be creative! "
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activityTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Types</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {" "}
                      {field.value.length > 0
                        ? `${field.value.length} selected`
                        : "Select Activities"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Activity Types</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {activityTypes.map((activity) => (
                      <DropdownMenuCheckboxItem
                        key={activity.id}
                        checked={field.value.includes(activity.id)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...field.value, activity.id]
                            : field.value.filter((id) => id !== activity.id);
                          field.onChange(updatedValue);
                        }}
                      >
                        {activity.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuCheckboxItem>
                      <Link
                        href="/activity-type"
                        className="text-blue-600 underline"
                      >
                        Create a new Activity
                      </Link>
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description"
                  className="h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="m-5">
          Create Venue
        </Button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
